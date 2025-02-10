import { useState, useEffect, useRef } from "react";
import { Send, Smile, Paperclip } from "lucide-react";
import axios from "axios";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
// Fetch the auth token from localStorage
const authToken = localStorage.getItem("authToken");

const socket = io(`${backendUrl}`, {
  auth: { token: authToken },
});

interface User {
  _id: string;
  username: string;
  avatarUrl: string;
}

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
  };
  text?: string;
  fileUrl?: string;
  fileType?: string;
}

export const ChatPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const chatRoomId = "12345";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setCurrentUser(response.data as User);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${backendUrl}/livechat/${chatRoomId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const formattedMessages = (response.data as any[]).map((msg: any) => ({
          id: msg._id,
          sender: {
            name: msg.sender.username,
            avatar: msg.sender.avatarUrl,
          },
          text: msg.text,
          fileUrl: msg.fileUrl,
          fileType: msg.fileType,
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    socket.emit("joinRoom", chatRoomId);

    const handleReceiveMessage = (newMessage: any) => {
      setMessages((prev) => [...prev, {
        id: newMessage._id,
        sender: {
          name: newMessage.sender.username,
          avatar: newMessage.sender.avatarUrl,
        },
        text: newMessage.text,
        fileUrl: newMessage.fileUrl,
        fileType: newMessage.fileType,
      }]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [chatRoomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;

    const formData = new FormData();
    formData.append("chatRoomId", chatRoomId);
    if (currentUser) {
      formData.append("senderId", currentUser._id);
    }
    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      formData.append("text", message.trim());
    }

    try {
      const response = await axios.post(`${backendUrl}/livechat/sendMessage`, formData, {
        headers: { Authorization: `Bearer ${authToken}`, "Content-Type": "multipart/form-data" },
      });
      socket.emit("sendMessage", response.data);
      setMessage("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 rounded-lg shadow-lg container mx-auto my-4 px-4 py-16">
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Live Trading Chat</h2>
        <p className="text-sm text-gray-400">{messages.length} traders online</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg) => {
          const isCurrentUser = currentUser ? msg.sender.name === currentUser.username : false;
          return (
            <div key={msg.id} className={`flex items-end ${isCurrentUser ? "justify-end" : "justify-start"}`}>
              {!isCurrentUser && <img src={msg.sender.avatar} alt={msg.sender.name} className="w-10 h-10 rounded-full mr-2" />}
              <div className={`max-w-[70%] rounded-lg p-4 shadow-md ${isCurrentUser ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-100"}`}>
                <span className="text-sm font-semibold">{msg.sender.name}</span>
                {msg.text && <p className="mt-1">{msg.text}</p>}
                {msg.fileUrl && <a href={msg.fileUrl} target="_blank" className="text-blue-400 underline">Download File</a>}
              </div>
              {isCurrentUser && <img src={msg.sender.avatar} alt={msg.sender.name} className="w-10 h-10 rounded-full ml-2" />}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-gray-800 border-t border-gray-700 relative">
        <div className="flex space-x-4 items-center">
          <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="text-gray-400 hover:text-white">
            <Smile className="w-6 h-6" />
          </button>
          {showEmojiPicker && <EmojiPicker onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)} />}
          <label className="text-gray-400 hover:text-white cursor-pointer">
            <Paperclip className="w-6 h-6" />
            <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
          </label>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2" placeholder="Type a message..." />
          <button type="submit" className="bg-indigo-600 text-white rounded-lg px-6 py-2 hover:bg-indigo-700">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

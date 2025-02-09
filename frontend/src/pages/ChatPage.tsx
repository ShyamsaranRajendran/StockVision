import React, { useState, useEffect, useRef } from "react";
import { Send, Smile, Paperclip, X } from "lucide-react";
import axios from "axios";
import io from "socket.io-client";
import EmojiPicker from "emoji-picker-react";

const authToken = localStorage.getItem("authToken");
const socket = io("http://localhost:5000", {
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
  fileName?: string;
}

export const ChatPage: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const chatRoomId = "12345";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/me", {
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
        const response = await axios.get(`http://localhost:5000/livechat/${chatRoomId}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        const formattedMessages = (response.data as any[]).map((msg: any) => ({
          id: msg.id,
          sender: {
            name: msg.sender?.username || "Unknown",
            avatar: msg.sender?.avatarUrl || "/default-avatar.png",
          },
          text: msg.text,
          fileUrl: msg.fileUrl,
          fileType: msg.fileType,
          fileName: msg.fileName,
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
        id: newMessage.id,
        sender: {
          name: newMessage.sender.username,
          avatar: newMessage.sender.avatarUrl || "/default-avatar.png",
        },
        text: newMessage.text,
        fileUrl: newMessage.fileUrl,
        fileType: newMessage.fileType,
        fileName: newMessage.fileName,
      }]);

      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("fileUploaded", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("fileUploaded", handleReceiveMessage);
    };
  }, [chatRoomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) return;
  
    if (!currentUser) {
      console.error("User not loaded yet");
      return;
    }
  
    const formData = new FormData();
    formData.append("chatRoomId", chatRoomId);
    formData.append("senderId", currentUser._id);
    
    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      formData.append("text", message.trim() || ""); // Ensure text is always sent
    }
  
    console.log("Sending FormData:", Object.fromEntries(formData.entries())); // Debug log
  
    try {
      const response = await axios.post("http://localhost:5000/livechat/sendMessage", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      const newMessage: Message = response.data as Message;
  
      setMessages((prev) => [
        ...prev,
        {
          id: newMessage.id,
          sender: {
            name: currentUser.username, // Ensure correct sender
            avatar: currentUser.avatarUrl, // Ensure correct avatar
          },
          text: newMessage.text,
          fileUrl: newMessage.fileUrl,
          fileType: newMessage.fileType,
        },
      ]);
  
      socket.emit("sendMessage", response.data);
      setMessage("");
      setSelectedFile(null);
    } catch (error: any) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };
  

  const renderFilePreview = (fileUrl: string, fileType: string, fileName: string) => {
    if (fileType?.startsWith("image/")) {
      return (
        <img
          src={fileUrl}
          alt={fileName}
          className="max-w-xs max-h-48 rounded-lg object-contain"
        />
      );
    }
    return (
      <div className="flex items-center space-x-2 text-blue-400">
        <Paperclip className="w-4 h-4" />
        <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
          {fileName}
        </a>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 rounded-lg shadow-lg container mx-auto my-4 px-4 py-16">
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Live Trading Chat</h2>
        <p className="text-sm text-gray-400">{messages.length} traders online</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((msg) => {
          const isCurrentUser = currentUser && msg.sender.name === currentUser.username;

          return (
            <div key={msg.id} className={`flex items-end ${isCurrentUser ? "justify-end" : "justify-start"}`}>
              {!isCurrentUser && (
                <img src={msg.sender.avatar} alt={msg.sender.name} className="w-10 h-10 rounded-full mr-2" />
              )}
              <div className={`max-w-[70%] rounded-lg p-4 shadow-md ${isCurrentUser ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-100"}`}>
                <span className="text-sm font-semibold">{msg.sender.name}</span>
                {msg.text && <p className="mt-1">{msg.text}</p>}
                {msg.fileUrl && renderFilePreview(msg.fileUrl, msg.fileType || "", msg.fileName || "file")}
              </div>
              {isCurrentUser && (
                <img src={msg.sender.avatar} alt={msg.sender.name} className="w-10 h-10 rounded-full ml-2" />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-gray-800 border-t border-gray-700 relative">
        <div className="flex space-x-4 items-center">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-gray-400 hover:text-white"
          >
            <Smile className="w-6 h-6" />
          </button>
          
          {showEmojiPicker && (
            <div className="absolute bottom-20 left-0">
              <EmojiPicker onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)} />
            </div>
          )}

          <label className="text-gray-400 hover:text-white cursor-pointer">
            <Paperclip className="w-6 h-6" />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
          </label>

          {selectedFile && (
            <div className="flex items-center bg-gray-700 rounded px-2 py-1">
              <span className="text-sm text-gray-300 truncate max-w-[150px]">
                {selectedFile.name}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="ml-2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isUploading}
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2"
            placeholder={isUploading ? "Uploading..." : "Type a message..."}
          />

          <button
            type="submit"
            disabled={isUploading}
            className={`${
              isUploading ? "bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white rounded-lg px-6 py-2 transition-colors`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
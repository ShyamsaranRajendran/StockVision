import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import CodeResponse from "./CodeResponse";
import { MessageCircle } from "lucide-react";

const ChatApp: React.FC = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState<{
    _id: number;
    role: string;
    parts: string;
  }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const surpriseOptions = [
    "Who do you make BLT sandwich?",
    "What is the capital of France?",
    "What is the best programming language?",
    "When is National Cat Day?",
  ];

  const surprise = () => {
    const randomValue = Math.floor(Math.random() * surpriseOptions.length);
    setValue(surpriseOptions[randomValue]);
  };

  const autoResizeInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const getResponse = async () => {
    if (!value) {
      setError("Please enter a question");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history: chatHistory, message: value }),
      });
  
      const data = await response.json(); // ⬅️ Parse JSON response
  
      // Extract the bot's reply from the JSON object
      const botReply = data.reply || "I didn't understand that.";
  
      const formattedResponse = botReply.startsWith("**")
        ? botReply
        : `**Bot:** ${botReply}`;
  
      const formattedUserMessage = `**You:** ${value}`;
  
      setChatHistory((oldChatHistory) => [
        ...oldChatHistory,
        { _id: Date.now(), role: "user", parts: formattedUserMessage },
        { _id: Date.now() + 1, role: "model", parts: formattedResponse },
      ]);
  
      setValue("");
      setError("");
      autoResizeInput();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    }
  };
  

  const clearChat = () => {
    setChatHistory([]);
    setValue("");
    setError("");
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [chatHistory]);

  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={24} />
      </button>
      {isOpen && (
        <div className="w-80 h-[600px] bg-white shadow-xl rounded-xl p-4 flex flex-col fixed bottom-16 right-20 border border-gray-300">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {chatHistory.map((chatItem) => (
              <div key={chatItem._id} className="p-2 rounded-md">
                {chatItem.role === "user" ? (
                  <div className="bg-blue-100 text-blue-800 p-2 rounded-lg">
                    <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                  </div>
                ) : chatItem.parts.startsWith("```") ? (
                  <CodeResponse code={chatItem.parts} />
                ) : (
                  <div className="bg-gray-200 p-2 rounded-lg">
                    <ReactMarkdown>{chatItem.parts}</ReactMarkdown>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="border-t pt-2 flex flex-col gap-2">
            <textarea
              ref={textareaRef}
              value={value}
              placeholder="Ask me anything..."
              onChange={(e) => {
                setValue(e.target.value);
                autoResizeInput();
              }}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-between">
              <button
                onClick={getResponse}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Ask
              </button>
              <button
                onClick={clearChat}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;

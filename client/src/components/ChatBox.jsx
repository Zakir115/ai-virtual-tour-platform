import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Halo! Saya asisten virtual tour ini. Silakan tanya tentang tempat ini.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    const textToSend = input;
    setInput('');
    setIsLoading(true);

    try {
      // LOGIKA OTOMATIS:
      // Jika mode Development (Laptop) -> pakai http://localhost:5000/api/chat
      // Jika mode Production (Vercel) -> pakai /api/chat (relatif)
      const apiUrl = import.meta.env.MODE === 'development' 
        ? 'http://localhost:5000/api/chat' 
        : '/api/chat';

      const response = await axios.post(apiUrl, { message: textToSend });
      
      const aiMessage = { sender: 'ai', text: response.data.reply };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error API:', error);
      const errorMessage = { sender: 'ai', text: 'Maaf, server sedang offline.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <div className="chat-header">Asisten AI</div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message ai-msg">Sedang mengetik...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input 
          type="text" placeholder="Tanya sesuatu..." value={input}
          onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>{isLoading ? '...' : 'Kirim'}</button>
      </div>
    </>
  );
};

export default ChatBox;
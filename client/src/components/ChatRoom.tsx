import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface Message {
  text: string;
  sender: string;
  id: string;
}

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState('');
  const [isNicknameSet, setIsNicknameSet] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000'; // Make sure this matches your backend server URL

  const handleCopy = () => {
    const inviteLink = window.location.href;
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }, () => {
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  useEffect(() => {
    if (!isNicknameSet) return;

    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      newSocket.emit('join_room', roomId);
    });

    newSocket.on('receive_message', (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, isNicknameSet]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && message.trim() && nickname) {
      const messageData: Message = {
        text: message,
        sender: nickname,
        id: (socket?.id || 'local') + '-' + Date.now(), // Unique ID for message
      };
      socket.emit('send_message', { ...messageData, roomId });
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setMessage('');
    }
  };

  const handleNicknameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      setIsNicknameSet(true);
    }
  };

  if (!isNicknameSet) {
    return (
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <h2 className="mb-3">Enter nickname to join: {roomId}</h2>
        <form onSubmit={handleNicknameSubmit} className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success">
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mt-4">
       <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/" className="btn btn-secondary">Leave Room</Link>
        <h2 className="text-center mb-0">Room: {roomId}</h2>
        <div>
          <button className="btn btn-info me-2" onClick={handleCopy}>
            {copySuccess ? copySuccess : 'Copy Invite Link'}
          </button>
        </div>
      </div>
      <div className="card mb-3 chat-window">
        <div className="card-body messages-container" style={{ height: '400px', overflowY: 'auto' }}>
          {messages.map((msg) => (
            <div key={msg.id} className={`message mb-2 ${msg.sender === nickname ? 'text-end' : ''}`}>
              <small className="text-muted">{msg.sender === nickname ? 'You' : msg.sender}</small>
              <div className={`p-2 rounded d-inline-block ${msg.sender === nickname ? 'bg-primary text-white' : 'bg-light'}`} style={{ maxWidth: '75%' }}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={sendMessage} className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={!socket}
        />
        <button type="submit" className="btn btn-primary" disabled={!socket || !message.trim()}>
          Send
        </button>
      </form>
      <p className="mt-3 text-muted text-center">Your nickname: <strong>{nickname}</strong></p>
    </div>
  );
};

export default ChatRoom;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');

  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 9);
    navigate(`/chat/${newRoomId}`);
  };

  const joinWithCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.trim()) {
      navigate(`/chat/${roomCode.trim()}`);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="mb-4">Welcome to Anonymous Chat!</h1>
        <button className="btn btn-primary btn-lg mb-4" onClick={createRoom}>
          Create New Chat Room
        </button>
        <p className="text-muted">No login required. Just create a room and share the link!</p>
        
        <hr className="my-4" style={{ width: '100%' }} />

        <form onSubmit={joinWithCode}>
          <div className="mb-3">
            <label htmlFor="roomCode" className="form-label">Or join with a Room Code:</label>
            <input
              type="text"
              id="roomCode"
              className="form-control"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              placeholder="Enter room code"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Join with Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
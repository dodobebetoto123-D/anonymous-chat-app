import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat/:roomId" element={<ChatRoom />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

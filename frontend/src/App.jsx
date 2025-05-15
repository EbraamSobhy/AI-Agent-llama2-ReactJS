import { BrowserRouter, Routes, Route } from 'react-router';
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';

export default function ChatApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Chat />} path="/chat" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
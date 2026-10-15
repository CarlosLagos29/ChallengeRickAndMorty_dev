import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <div className="font-marker text-xl text-white">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;

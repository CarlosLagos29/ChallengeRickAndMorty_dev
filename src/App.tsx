import { Route, Routes } from 'react-router';
import CharacterDetailPage from './pages/CharacterDetailPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <div className="font-marker text-xl font-extrabold text-white">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:id" element={<CharacterDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;

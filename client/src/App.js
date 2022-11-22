import { Route, Routes } from 'react-router-dom'
import './App.css';
import Homepage from './components/Homepage'
import V1 from './components/V1'
import V5 from './components/V5';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/v1" element={<V1 />} />
      <Route path="/v5" element={<V5 />} />
    </Routes>
  );
}

export default App;

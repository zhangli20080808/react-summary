import { HashRouter as Router, Link, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DragDemo from './pages/dragDemo';
import DropDemo from './pages/dropDemo';
import TransferElement from './pages/transferElement';
import DataTransferDemo from './pages/dataTransferDemo';

export default function RouterConfig() {
  return (
    <Router>
      <Link to="/dragDemo">dragDemo</Link><br />
      <Link to="/dropDemo">dropDemo</Link><br />
      <Link to="/TransferElement">TransferElement</Link><br />
      <Link to="/DataTransferDemo">DataTransferDemo</Link><br />
      <Routes>
        <Route path="/dragDemo" element={<DragDemo/>}/>
        <Route path="/dropDemo" element={<DropDemo/>}/>
        <Route path="/TransferElement" element={<TransferElement/>}/>
        <Route path="/DataTransferDemo" element={<DataTransferDemo/>}/>
        
        <Route path="/" exact element={<HomePage/>}/>
      </Routes>
    </Router>
  )
};
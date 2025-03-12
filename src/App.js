
import Header from './components/Header';
import Table from './components/Table';
import React ,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Map from "./components/map/map";

function App() {
  const [data, setData] = useState([]);
  return (
    <Router>
    <div className="App">
      <Header />
      <Table data={data} setData={setData}/>
    </div>
    <Routes>
        <Route path="/" />
        <Route path="/Map" element={<Map vehicleData={data}/>} />
    </Routes>
    </Router>
    
  );
}

export default App;

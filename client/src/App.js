import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/components/Home";
import Detail from '../src/components/Detail';
import BreedCreate from '../src/components/BreedCreate';
import Landing from '../src/components/Landing';

function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/dogs" element={<Home />} />
      <Route exact path="/dogs/:id" element={<Detail />} />
      <Route exact path="/newBreed" element={<BreedCreate />} />
    </Routes>

  );
}

export default App;
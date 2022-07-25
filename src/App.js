import './App.css';
import Navbar from './components/Navbar'
import MealList from './components/MealList'
import Footer from './components/Footer'
import AddMeal from './components/AddMeal'
import ViewMeal from './components/ViewMeal'
import { React } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes >
          <Route index element={<MealList/>} />
          <Route path="/" element={<MealList />}></Route>
          <Route path="/mealList" element={<MealList />}/>
          <Route path="/addMeal" element={<AddMeal />} />
          <Route path="/viewMeal/:id" element={<ViewMeal />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

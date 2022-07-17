import './App.css';
import Navbar from './components/Navbar'
import MealList from './components/MealList'
import Footer from './components/Footer'
import AddMeal from './components/AddMeal'

function App() {
  return (
    <div className="App">
      <Navbar />
      <MealList />
      <Footer />
      <AddMeal />
    </div>
  );
}

export default App;

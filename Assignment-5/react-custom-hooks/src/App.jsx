
import "./App.css";
import Products from "./components/Products";

function App() {
  return (
    <div className="app">
      <header>
        <h1 className="products-heading">Our Products</h1>
      </header>

      <Products />
    </div>
  );
}

export default App;

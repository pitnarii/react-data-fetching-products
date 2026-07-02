import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
        const response = await axios.get("http://localhost:4001/products");
        setProducts(response.data.data);
    };
    getProducts();
  }, []);

  const deleteProduct = async (id) => {
  
      await axios.delete(`http://localhost:4001/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-preview">
              <img
                src={product.image}
                alt={product.name}
                width="100"
                height="100"
              />
            </div>
            <div className="product-detail">
              <h1>{product.name}.</h1>
              <h2>{product.price}</h2>
              <p>{product.description}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteProduct(product.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

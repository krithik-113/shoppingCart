import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Billboard from "./Components/Billboard";
import ProductContainer from "./Components/ProductContainer";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/products.json")
      .then((response) => response.json())
      .then((result) => {
        if (result && result.data.length > 0) {
          setProducts(result.data);
        }
      });
  }, []);
  function handleAddToCart(data) {
    const cartCopy = [...cart];
    cartCopy.push(data);
    setCart(cartCopy);
  }

  function handleRemoveFromCart(data) {
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter((item) => item.id != data.id);
    setCart(cartCopy);
  }
  return <div className="App">
    <Header quantity={cart.length} />
    <Billboard />
    <ProductContainer
      products={products}
      handleAddToCart={handleAddToCart}
      handleRemoveFromCart={handleRemoveFromCart}
      cart={cart}
    />
  </div>;
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import { Navbar, Products, Cart, CheckoutForm } from "./components";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    // console.log(data);

    setProducts(data);
  };

  const fetchCart = async () => {
    // const cart = await commerce.cart.retrieve();
    // setCart(cart);

    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCart(response);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response);
  };

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingorder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingorder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log("cart.total_items: ", cart.total_items);

  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            exact
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <CheckoutForm
                cart={cart}
                order={order}
                error={errorMessage}
                onCaptureCheckout={handleCaptureCheckout}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

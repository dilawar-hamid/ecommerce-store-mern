import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.product._id === product._id,
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCartItems([...cartItems, { product: product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.product._id !== id));
  };

  
const updateQuantity = (id, newQty) => {
  if (newQty < 1) {
    return;
  }

  setCartItems(
    cartItems.map((item) =>
      item.product._id === id
        ? { ...item, quantity: newQty }
        : item
    )
  );
};


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart , removeFromCart , updateQuantity}}>   
      {children}
    </CartContext.Provider>
  );
};

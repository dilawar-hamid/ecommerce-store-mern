import { Link, useLocation } from "react-router-dom";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, authReady } = useContext(AuthContext);
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [cartUserId, setCartUserId] = useState(null);
  const [cartReady, setCartReady] = useState(false);

  // Check whether the loaded cart belongs to the current user
  const isCurrentCart =
    authReady && !!user && cartReady && cartUserId === user.id;

  // Load the current user's cart
  useEffect(() => {
    if (!authReady) return;

    if (!user) {
      setCartItems([]);
      setCartUserId(null);
      setCartReady(false);
      return;
    }

    const key = `cartItems_${user.id}`;
    let savedItems = [];

    try {
      const savedCart = localStorage.getItem(key);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          savedItems = parsedCart;
        } else {
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      localStorage.removeItem(key);
    }

    setCartReady(false);
    setCartItems(savedItems);
    setCartUserId(user.id);
    setCartReady(true);
  }, [user, authReady]);

  // Add the pending product after login and cart loading
  useEffect(() => {
    if (!authReady || !user || !isCurrentCart) return;

    const pendingProduct = sessionStorage.getItem("pendingCartProduct");

    if (!pendingProduct) return;

    let product;

    try {
      product = JSON.parse(pendingProduct);

      if (!product?._id) {
        sessionStorage.removeItem("pendingCartProduct");
        return;
      }
    } catch (error) {
      sessionStorage.removeItem("pendingCartProduct");
      return;
    }

    // Remove it first so the same pending product is not processed again
    sessionStorage.removeItem("pendingCartProduct");

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.product._id === product._id,
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...previousItems, { product, quantity: 1 }];
    });

    toast.success("Product added to cart!");
  }, [authReady, user, isCurrentCart]);

  // Save only when the loaded cart belongs to the current user
  useEffect(() => {
    if (!isCurrentCart) return;

    localStorage.setItem(`cartItems_${user.id}`, JSON.stringify(cartItems));
  }, [cartItems, user, isCurrentCart]);

  const addToCart = (product) => {
    if (!authReady) return;

    if (!user) {
      sessionStorage.setItem("pendingCartProduct", JSON.stringify(product));

      toast.info(
        <div>
          <p className="mb-2">Please log in to add items to your cart.</p>

          <Link
            to="/login"
            state={{ from: location }}
            className="btn btn-sm custom-btn-register rounded-pill px-3"
            onClick={() => toast.dismiss()}
          >
            Login Now
          </Link>
        </div>,
        {
          autoClose: 5000,
          closeOnClick: false,
        },
      );

      return;
    }

    if (!isCurrentCart) return;

    const existingItem = cartItems.find(
      (item) => item.product._id === product._id,
    );

    if (existingItem) {
      toast.success("Cart quantity updated!");
    } else {
      toast.success("Product added to cart!");
    }

    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.product._id === product._id,
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...previousItems, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    if (!isCurrentCart) return;

    setCartItems((previousItems) =>
      previousItems.filter((item) => item.product._id !== id),
    );
  };

  const updateQuantity = (id, newQty) => {
    if (!isCurrentCart || newQty < 1) return;

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.product._id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const clearCart = () => {
    if (!isCurrentCart) return;

    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: isCurrentCart ? cartItems : [],
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

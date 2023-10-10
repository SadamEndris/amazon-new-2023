// Import necessary dependencies and Firebase authentication
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Components/checkout/Checkout";
import Login from "./Components/Login/Login";
import { useEffect } from "react";
import { useStateValue } from "./Components/contexts/StateProvider";
import { auth } from "./firebase";
import Payment from "./Components/Payment/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Components/Order/Orders";
const promise = loadStripe(
  "pk_test_51NyvAdGRI6rw8w9KelxHOIEBee8wJSffnTJmMnANpbS5Qt3Ab4xUvyqWbm00ZMKRhxqSl0FyCScpA9EDeD8L0s3500uL0Eae44"
);
function App() {
  // Retrieve the state and dispatch function using the custom useStateValue hook
  const [{}, dispatch] = useStateValue();
  // Use React's useEffect hook to add a listener for authentication state changes
  useEffect(() => {
    // Set up an observer for changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // If a user is authenticated, dispatch an action to set the user in the state
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // If no user is authenticated, dispatch an action to set the user in the state to null
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    // Clean up the listener when the component unmounts to prevent memory leaks
    return () => {
      unsubscribe();
    };
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="App">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import CheckProduct from "../CheckProduct/CheckProduct";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "../../axios";
import CurrencyFormat from "react-currency-format";
import { db } from "../../firebase";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  //  generate the special stripe seceret which allows us to charge a customer
  //  uses the useEffect hook to make an asynchronous request to your server to fetch a client secret for handling payments using Stripe. The client secret is then stored in the component's state using setClientSecret.

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: "post",
          withCredentials: false,
          //stripe expects the total in a currencies subunits
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        // console.log(response);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log(error);
      }
    };
    getClientSecret();
  }, [basket]);

  console.log("THE SECRETE IS  >>>", clientSecret);

  // The useEffect hook is set up to run whenever the basket prop changes. This means that when the basket prop is updated, it will trigger a new request to /payments/create to fetch the updated client secret.

  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

  // The function uses the reduce method to iterate over the items in the basket and sum their prices.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        console.log(paymentIntent);

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        console.log(paymentIntent);
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        // to make the basket null
        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders");
      });
  };
  const handleChange = (event) => {
    //listen for changes in the CardElement
    //and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* payment section delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p> 1234 React lane</p>
            <p>Baltimore,MD</p>
          </div>
        </div>
        {/* payment section -- review address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                Product={item.Product}
              />
            ))}
          </div>
        </div>

        {/* payment section payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">{/* stripe magic will go */}</div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value} </h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabledPh={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

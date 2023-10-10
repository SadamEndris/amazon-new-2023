import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider.js";
import { auth } from "../../firebase";
const Header = () => {
  const [{ basket, user }] = useStateValue();
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="amazon-logo"
        />
      </Link>

      <div className="header_search">
        <input className="header_input" type="text" />
        <SearchIcon className="search_icon" />
      </div>

      <div className="header_nav">
        <div onClick={handleAuthentication} className="header_option">
          <span className="lineOne">Hello {!user ? "Guest" : user.email}</span>

          <Link to={!user && "/login"} className="header__clearlink">
            <span className="lineTwo"> {user ? "Sign Out" : "Sign In"}</span>
          </Link>
        </div>
        <Link to="./orders">
          <div className="header_option">
            <span className="lineOne">Returns</span>
            <span className="lineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header_option">
          <span className="lineOne">Your</span>
          <span className="lineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingCartIcon />
            <span className="header_basketCount">{basket.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;

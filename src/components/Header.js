import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import cartPreviewImg from '../images/image-product-1-thumbnail.jpg';

const Header = () => {// constant itemCount
  const [isCartEmpty, setIsCardEmpty] = useState(false);// true/******** */
  // img src constant
  const count=3;

  const [isVisible, setIsVisible] = useState(false);

  function handleMouseOver(){
    setIsVisible(true);
  }

  function handleMouseOut() {
    setIsVisible(false);
  }
  return(
    <header className="header">
      <div className="header__main">
        <img className="header__logo" src={logo} alt="ecommerce brand logo"/>
        <nav className="header__navbar">
          <Link className="header__navbar-link" to="/">Collections</Link>
          <Link className="header__navbar-link" to="/">Women</Link>
          <Link className="header__navbar-link" to="/">Men</Link>
          <Link className="header__navbar-link" to="/">About</Link>
          <Link className="header__navbar-link" to="/">Contact</Link>
        </nav>
      </div>
      <div className="header__account">
        <div className="header__shopping-info">
          <button className="header__shopping-cart" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className="header__shopping-cart-notification header__shopping-cart-notification_active">
              <p className="header__shopping-cart-count">{count}</p>
            </div>
          </button>
          <Link to="/" className="header__account-profile" />
        </div>
        <div className="header__cart-preview-popup" 
          style={isVisible ? { visibility:'visible', opacity:1} : { visibility:'hidden', opacity:0}}
          onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
        >
          <p className="header__cart-preview-title">Cart</p>
          { isCartEmpty ? 
          <p className="header__cart-preview-empty">Your cart is empty.</p>
          :
          <div className="header__cart-preview-full">
            <img className="header__cart-preview-img" src={cartPreviewImg} alt="sneakers"/>
            <p className="header__cart-preview-name">Fall Limited Edition Sneakers</p>
            <p className="header__cart-preview-price">$ 125.00 X {count} <span className="header__cart-preview-calc">$ {125.00 * count}.00</span></p>
            <button className="header__cart-preview-delete" type="button"></button>
            <button className="header__cart-preview-checkout" type="button">Checkout</button>
          </div> 
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
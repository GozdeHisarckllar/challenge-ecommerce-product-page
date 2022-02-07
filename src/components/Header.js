import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
//import cartPreviewImg from '../images/image-product-1-thumbnail.jpg';

const Header = ({ cartData, onRemoveCart }) => {// constant itemCount
  //const [isCartEmpty, setIsCardEmpty] = useState(false);// true/******** */
  // img src constant

  const [isVisible, setIsVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  function handleMouseOver(){
    setIsVisible(true);
  }

  function handleMouseOut() {
    setIsVisible(false);
  }

  function handleRemoveItem(itemId) {
    onRemoveCart(itemId);
  }

  useEffect(() => {
    const count = cartData.reduce((prev, current) => {
      if (prev instanceof Object) {
        return prev['count'] + current['count'];
      } else {
        return prev + current['count'];
      }  
    }, 0);
    setNotificationCount(count);
  }, [cartData]);

  return(
    <header className="header">
      <div className="header__main">
        <Link className="header__logo-link" to="/">
          <img className="header__logo" src={logo} alt="sneakers brand logo"/>
        </Link>
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
          <button className="header__shopping-cart" type="button" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={`header__shopping-cart-notification ${cartData.length ? 'header__shopping-cart-notification_active':''}`}>
              <p className="header__shopping-cart-count">{notificationCount}</p>
            </div>
          </button>
          <Link to="/" className="header__account-profile" />
        </div>
        <div className="header__cart-preview-popup" 
          style={isVisible ? { visibility:'visible', opacity:1} : { visibility:'hidden', opacity:0}}
          onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
        >
          <p className="header__cart-preview-title">Cart</p>
          { cartData.length === 0 ? 
          <p className="header__cart-preview-empty">Your cart is empty.</p>
          :
            cartData.map((cartItem) => (
            <div key={cartItem.id} className="header__cart-preview-full">
              <img className="header__cart-preview-img" src={cartItem.image} alt="sneakers"/>
              <p className="header__cart-preview-name">Fall Limited Edition Sneakers</p>
              <p className="header__cart-preview-price">$ {cartItem.price.toFixed(2)} X {cartItem.count} <span className="header__cart-preview-calc">$ {cartItem.price.toFixed(2) * cartItem.count}.00</span></p>
              <button className="header__cart-preview-delete" type="button" onClick={() => handleRemoveItem(cartItem.id)}></button>
              <button className="header__cart-preview-checkout" type="button">Checkout</button>
            </div>
            )
           )
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
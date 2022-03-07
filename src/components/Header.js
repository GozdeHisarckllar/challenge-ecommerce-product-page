import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../images/logo.svg';

const Header = ({ cartData, onRemoveCart }) => {

  const [isVisible, setIsVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isNavbarPanelOpened, setIsNavbarPanelOpened] = useState(false);

  /*function handleMouseOver(){
    setIsVisible(true);
  }

  function handleMouseOut() {
    setIsVisible(false);
  }*/

  function handleRemoveItem(itemId) {
    onRemoveCart(itemId);
  }

  function handleOpenNavbarPanel() {
    setIsNavbarPanelOpened(true);
  }

  function handleCloseNavbarPanel() {
    setIsNavbarPanelOpened(false);
  }

  function handleToggleCartPopup() {
    setIsVisible(!isVisible);
  }

  function handleCloseCartPopup() {
    setIsVisible(false);
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

  useEffect(() => {
    const closeNavbarPanel = (event) => {
      return event.key === 'Escape' ? handleCloseNavbarPanel() : '';
    }

    const closeCartPopup = (event) => {
      return !Array.from(event.target.classList).some(classname => /(?:header__(?:shopping-cart|cart-preview).*|product__(?:count|add-btn))/.test(classname)) ? handleCloseCartPopup() : '';
    }

    const closeNavbarPanelWithResizing = (event) => {
      if (event.target.innerWidth > 930){
        return handleCloseNavbarPanel();
      }
    }

    document.addEventListener('keyup', closeNavbarPanel);
    document.addEventListener('click', closeCartPopup);
    window.addEventListener('resize', closeNavbarPanelWithResizing);

    return () => {
      document.removeEventListener('keyup', closeNavbarPanel);
      document.removeEventListener('click', closeCartPopup);
      window.removeEventListener('resize', closeNavbarPanelWithResizing)
    }
  }, []);

  return(
    <header className="header">
      <div className="header__main">
        <div className='header__navbar-open-btn' onClick={handleOpenNavbarPanel}></div>
        <Link className="header__logo-link" to="#">
          <img className="header__logo" src={logo} alt="sneakers brand logo"/>
        </Link>
          <Navbar navbarModifier='' linkModifier=''/>
        <div className={`header__navbar-panel-overlay ${isNavbarPanelOpened ? 'header__navbar-panel-overlay_opened' : 'header__navbar-panel-overlay_closed'}`} onClick={handleCloseNavbarPanel}></div>
        <div className={`header__navbar-side-panel ${isNavbarPanelOpened ? 'header__navbar-side-panel_opened' : 'header__navbar-side-panel_closed'}`}>
          <div className='header__navbar-close-btn' onClick={handleCloseNavbarPanel}></div>
          <Navbar navbarModifier='header__navbar_mobile' linkModifier='header__navbar-link_mobile'/>
        </div>
      </div>
      <div className="header__account">
        <div className="header__shopping-info">
          <button className="header__shopping-cart" type="button" /*onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}*/ onClick={handleToggleCartPopup}>
            <span className={`header__shopping-cart-notification ${cartData.length ? 'header__shopping-cart-notification_active':''}`}>
              <span className="header__shopping-cart-count">{notificationCount}</span>
            </span>
          </button>
          <Link to="/" className="header__account-profile" />
        </div>
        <div className={`header__cart-preview-popup ${isVisible ? 'header__cart-preview-popup_opened':''}`}
          /*onMouseOver={handleMouseOver} 
          onMouseOut={handleMouseOut}*/
        >
          <p className="header__cart-preview-title">Cart</p>
          { cartData.length === 0 ? 
          <p className="header__cart-preview-empty">Your cart is empty.</p>
          :
          <ul className={`header__cart-list ${cartData.length > 1 ? 'header__cart-list_overflow' : ''}`}>
            {cartData.map((cartItem) => (
            <li key={cartItem.id} className="header__cart-preview-full">
              <img className="header__cart-preview-img" src={cartItem.image} alt="sneakers"/>
              <p className="header__cart-preview-name">Fall Limited Edition Sneakers</p>
              <p className="header__cart-preview-price">$ {cartItem.price.toFixed(2)} X {cartItem.count} <span className="header__cart-preview-calc">$ {cartItem.price.toFixed(2) * cartItem.count}.00</span></p>
              <button className="header__cart-preview-delete" type="button" aria-label='remove this item from your cart' onClick={() => handleRemoveItem(cartItem.id)}></button>
            </li>
             )
            ) }
          </ul>  
          }
          {cartData.length !== 0 && <button className="header__cart-preview-checkout" type="button" aria-label='checkout'>Checkout</button>}
        </div>
      </div>
    </header>
  );
}

export default Header;
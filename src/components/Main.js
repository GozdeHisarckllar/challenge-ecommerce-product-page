import { useState } from 'react';
/*import product1 from '../images/image-product-1.jpg';
import product2t from '../images/image-product-2.jpg';
import product3t from '../images/image-product-3.jpg';
import product4t from '../images/image-product-4.jpg';*/

import iconPlus from '../images/icon-plus.svg';
import iconMinus from '../images/icon-minus.svg';

import iconCart from '../images/icon-cart.svg';

import Gallery from './Gallery';
//dict map key imgid

const Main = ({ isModalOpened, onOpenModal }) => {

  /*const [galleryMainImg, setGalleryMainImg] = useState('');
  const [activeImg, setActiveImg] = useState('image-product-1');*/
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  /*const regex = /image-product-\d/;
  let sourceString;*/

  /*function handleImgClick(event) {
    if (event.target.classList.contains('gallery__img')) {
      setGalleryMainImg(event.target.src);
      sourceString = event.target.src.toString();
    } else {
      setGalleryMainImg(event.target.querySelector('.gallery__img').src);
      sourceString = event.target.querySelector('.gallery__img').src.toString();
    }
    
    setActiveImg(sourceString.match(regex)[0]);
    //console.log(sourceString.match(regex)[0]);
  }// background -image key i   or   move all the gallery and function*/

  function handleChangeQuantity(event) {
    /*let value = event.target.value.toString()
    if (value.match(/1/)) {
      value = Number(value.replace(/1/, 1));
    }*/
    setPurchaseQuantity(Number(event.target.value));
  }
  return (
    <main className='content'>
      <Gallery isLightbox={false} isModalOpened={isModalOpened} onOpenModal={onOpenModal} />
      <section className='product'>
        <div className='product__container'>
          <p className='product__label'>Sneaker Company</p>
          <h1 className='product__title'>Fall Limited Edition Sneakers</h1>
          <p className='product__description'>
            These low-profile sneakers are your perfect casual wear companion. Featuring a durable 
            rubber outer sole, they’ll withstand everything the weather can offer.
          </p>
          <div className='product__cost-info'>
            <div className='product__cost-container'>
              <p className='product__price'>{`$${purchaseQuantity ? (125.00 * purchaseQuantity).toFixed(2): 125.00.toFixed(2)}`}</p>
              <p className='product__discount'>50%</p>
            </div>
            <p className='product__retail'>$250.00</p>
          </div>
        </div>
        <form className='product__cart-info'>
          <label className='product__counter-container' >
            <img className='product__counter-icon product__counter-icon_type_minus' src={iconMinus} alt='discriment the quantity' onClick={() => {purchaseQuantity <= 1 ? setPurchaseQuantity(Number(purchaseQuantity)) : setPurchaseQuantity(Number(purchaseQuantity) - 1)}}/>
            <input className='product__count' value={purchaseQuantity} name='quantity' onChange={handleChangeQuantity} maxLength='2' onMouseOut={() => purchaseQuantity ? '' : setPurchaseQuantity(1)}/>
            <img className='product__counter-icon product__counter-icon_type_plus' src={iconPlus} alt='increment the quantity' onClick={() => {if (purchaseQuantity < 99) {setPurchaseQuantity(Number(purchaseQuantity) + 1)}}} />
          </label>
          <button className='product__add-btn' type='button' aria-label='add this item to your cart'>
            <img className='product__add-cart-icon' src={iconCart} alt='cart icon'/>
            <p className='product__add-btn-label'>Add to cart</p>
          </button>
        </form>
      </section>

    </main>
  );
}

export default Main;
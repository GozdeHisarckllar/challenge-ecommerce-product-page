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
// data Context
const Main = ({ productData, isModalOpened, onOpenModal, onCloseModal, onAddCart }) => {

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

  function handleSubmitAddCart(event) {
    event.preventDefault();
    const cartListItem = {
      id: productData[0].id,
      title: productData[0].title,
      price: productData[0].salePrice,
      image: productData[0].images[0].thumbnail,
      count: purchaseQuantity
    };

    onAddCart(cartListItem);
  }
  
  return (
    <main className='content'>
      <Gallery
        productData={productData}
        isLightbox={false} 
        isModalOpened={isModalOpened} 
        onOpenModal={onOpenModal} 
        onCloseModal={onCloseModal}
      />
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
              <p className='product__price'>{`$${purchaseQuantity ? (productData[0].salePrice * purchaseQuantity).toFixed(2): productData[0].salePrice.toFixed(2)}`}</p>
              <p className='product__discount'>{`${Math.abs(Math.round((productData[0].salePrice - productData[0].listPrice) / productData[0].listPrice * 100))}%`}</p>
            </div>
            <p className='product__retail'>{`$${productData[0].listPrice.toFixed(2)}`}</p>
          </div>
        </div>
        <form className='product__cart-info' onSubmit={handleSubmitAddCart}>
          <label className='product__counter-container' >
            <img className='product__counter-icon product__counter-icon_type_minus' src={iconMinus} alt='discriment the quantity' onClick={() => {purchaseQuantity <= 1 ? setPurchaseQuantity(Number(purchaseQuantity)) : setPurchaseQuantity(Number(purchaseQuantity) - 1)}}/>
            <input className='product__count' value={purchaseQuantity} name='quantity' onChange={handleChangeQuantity} maxLength='2' onMouseOut={() => purchaseQuantity ? '' : setPurchaseQuantity(1)}/>
            <img className='product__counter-icon product__counter-icon_type_plus' src={iconPlus} alt='increment the quantity' onClick={() => {if (purchaseQuantity < 99) {setPurchaseQuantity(Number(purchaseQuantity) + 1)}}} />
          </label>
          <button className='product__add-btn' type='submit' aria-label='add this item to your cart'>
            <img className='product__add-cart-icon' src={iconCart} alt='cart icon'/>
            <p className='product__add-btn-label'>Add to cart</p>
          </button>
        </form>
      </section>

    </main>
  );
}

export default Main;// [{id:1, name, price, count: }, {}]  product data = [id, images, name, price]
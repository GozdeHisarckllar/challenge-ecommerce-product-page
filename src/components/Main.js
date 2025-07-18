import { useState } from 'react';
import iconCart from '../images/icon-cart.svg';
import Gallery from './Gallery';

const Main = ({ productData, isModalOpened, onOpenModal, onCloseModal, onAddCart, onSetImgStartIndex, imgStartIndex }) => {

  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  function handleChangeQuantity(event) {
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
        onSetImgStartIndex={onSetImgStartIndex}
        imgStartIndex={imgStartIndex}
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
              <p className='product__price'>{`$${(productData[0].salePrice * purchaseQuantity).toFixed(2)}`}</p>
              <p className='product__discount'>{`${Math.abs(Math.round((productData[0].salePrice - productData[0].listPrice) / productData[0].listPrice * 100))}%`}</p>
            </div>
            <p className='product__retail'>{`$${(productData[0].listPrice * purchaseQuantity).toFixed(2)}`}</p>
          </div>
        </div>
        <form className='product__cart-info' name='productForm' onSubmit={handleSubmitAddCart}>
          <label className='product__counter-container' >
            <button className='product__counter-icon product__counter-icon_type_minus' type="button" aria-label='discriment the quantity' onClick={() => {purchaseQuantity <= 1 ? setPurchaseQuantity(Number(purchaseQuantity)) : setPurchaseQuantity(Number(purchaseQuantity) - 1)}}/>
            <input className='product__count' value={purchaseQuantity} name='quantity' type="number" readOnly onChange={handleChangeQuantity}  onMouseOut={() => purchaseQuantity ? '' : setPurchaseQuantity(1)}/>
            <button className='product__counter-icon product__counter-icon_type_plus' type="button" aria-label='increment the quantity' onClick={() => {if (purchaseQuantity < 50) {setPurchaseQuantity(Number(purchaseQuantity) + 1)}}} />
          </label>
          <button className='product__add-btn' type='submit' aria-label='add this item to your cart'>
            <img className='product__add-cart-icon' src={iconCart} alt='cart icon'/>
            <span className='product__add-btn-label'>Add to cart</span>
          </button>
        </form>
      </section>

    </main>
  );
}

export default Main;
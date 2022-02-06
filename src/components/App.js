import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import ModalWindow from './ModalWindow';
import productData from '../utils/data';
//import productData from '../utils/data';
// import logo from './logo.svg';

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [cartData, setCartData] = useState([]);

  function handleOpenModal() {
    setIsModalOpened(true);
  }

  function handleCloseModal() {
    setIsModalOpened(false);
  }

  function handleAddCart(addedItem) {
    const item = cartData.find((cartItem) => cartItem.id === addedItem.id);
    if (!item) {
      setCartData([...cartData, addedItem]);
    } else {
      setCartData(cartData.map((cartItem) => cartItem.id === item.id ? {...cartItem, count:addedItem.count} : cartItem));
    }
  }

  function handleRemoveCart(removedId) {
    setCartData(cartData.filter((cartItem) => cartItem.id !== removedId));
  }

  useState(() => {
    const handleClickCloseModal = (event) => {
      return event.target.classList.contains('modal') ? handleCloseModal() : '';
    }

    const handleEscCloseModal = (event) => {
      return event.key === 'Escape' ? handleCloseModal() : '';
    }

    document.addEventListener('click', handleClickCloseModal);
    document.addEventListener('keydown', handleEscCloseModal);

    return () => {
      document.removeEventListener('click', handleClickCloseModal);
      document.removeEventListener('keydown', handleEscCloseModal);
    }
  }, []);

  return (
    <div className="page__container">
      <Header cartData={cartData} onRemoveCart={handleRemoveCart}/>
      <Main
        productData={productData} 
        isModalOpened={isModalOpened} 
        onOpenModal={handleOpenModal} 
        onCloseModal={handleCloseModal}
        onAddCart={handleAddCart}
      />
      <ModalWindow
        productData={productData}
        isModalOpened={isModalOpened} 
        onOpenModal={handleOpenModal} 
        onCloseModal={handleCloseModal}
      />
    </div>
  );
}
// main + modal window router /product/:id  main ->useParams  prductData findbyid.images pass images to gallery
export default App;

import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import ModalWindow from './ModalWindow';
import productData from '../utils/data';
import Footer from './Footer';

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

    const closeLightboxWithResizing = (event) => {
      if (event.target.innerWidth <= 820){
        return handleCloseModal();
      }
    }

    document.addEventListener('click', handleClickCloseModal);
    document.addEventListener('keydown', handleEscCloseModal);
    window.addEventListener('resize', closeLightboxWithResizing);

    return () => {
      document.removeEventListener('click', handleClickCloseModal);
      document.removeEventListener('keydown', handleEscCloseModal);
      window.removeEventListener('resize', closeLightboxWithResizing);
    }
  }, []);

  return (
    <div className="page__container">
      <Header 
        cartData={cartData} 
        onRemoveCart={handleRemoveCart}
      />
      <Main
        productData={productData} 
        isModalOpened={isModalOpened} 
        onOpenModal={handleOpenModal} 
        onCloseModal={handleCloseModal}
        onAddCart={handleAddCart}
      />
      <Footer />
      <ModalWindow
        productData={productData}
        isModalOpened={isModalOpened} 
        onOpenModal={handleOpenModal} 
        onCloseModal={handleCloseModal}
      />
    </div>
  );
}

export default App;
/// Simulation - Rendering data from API
// first way ->main + modal window or pass item data to modal -> Link to='/:item.id') -> (Single router) Router /product/:id  main ->useParams  prductData findbyid.images pass images to gallery
// second way ->data.map((item) => list item -> Link to='/:item.id') + (Many routers) Router path='/item.id' data={item.data})

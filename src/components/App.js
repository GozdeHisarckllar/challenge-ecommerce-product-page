import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import ModalWindow from './ModalWindow';
import productData from '../utils/data';
import Footer from './Footer';

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [imgStartIndex, setImgStartIndex] = useState(0)

  function handleOpenModal() {
    setIsModalOpened(true);
  }

  function handleCloseModal() {
    setIsModalOpened(false);
  }

  function handleSetImgStartIndex(index) {
    setImgStartIndex(index)
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
        onSetImgStartIndex={handleSetImgStartIndex}
        imgStartIndex={imgStartIndex}
      />
      <Footer />
      <ModalWindow
        productData={productData}
        isModalOpened={isModalOpened} 
        onOpenModal={handleOpenModal} 
        onCloseModal={handleCloseModal}
        onSetImgStartIndex={handleSetImgStartIndex}
        imgStartIndex={imgStartIndex}
      />
    </div>
  );
}

export default App;

// Some notes - Simulation - Rendering data from API:
// i) ->main + modal window or pass item data to modal -> Link to='/:item.id') -> (Single router) Router /product/:id  main ->useParams  prductData findbyid.images pass images to gallery
// ii) ->data.map((item) => list item -> Link to='/:item.id') + (Many routers) Router path='/item.id' data={item.data})

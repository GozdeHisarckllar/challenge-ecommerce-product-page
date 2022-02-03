import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import ModalWindow from './ModalWindow';
import productData from '../utils/data';
//import productData from '../utils/data';
// import logo from './logo.svg';

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  function handleOpenModal() {
    setIsModalOpened(true);
  }

  function handleCloseModal() {
    setIsModalOpened(false);
  }

  return (
    <div className="page__container">
      <Header/>
      <Main
        productData={productData} 
        isModalOpened={isModalOpened} 
        onOpenModal={handleOpenModal} 
        onCloseModal={handleCloseModal}
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

export default App;

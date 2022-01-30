import { useState } from 'react';
import Header from './Header';
import Main from './Main';
import ModalWindow from './ModalWindow';
//import productData from '../utils/data';
// import logo from './logo.svg';

function App() {
  const [isModalOpened, setIsModalOpened] = useState(false);

  function handleOpenModal() {
    setIsModalOpened(true);
  }

  return (
    <div className="page__container">
      <Header/>
      <Main isModalOpened={isModalOpened} onOpenModal={handleOpenModal}/>
      <ModalWindow isModalOpened={isModalOpened} onOpenModal={handleOpenModal}/>
    </div>
  );
}

export default App;

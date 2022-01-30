import Gallery from './Gallery';

const ModalWindow = ({ isModalOpened, onOpenModal }) => {
  /*const [imgIndex, setImgIndex] = useState(0);
  
  function h() {
    imgIndex === 3 ? setImgIndex(0): setImgIndex(imgIndex+1);
  }

  function j() {
    imgIndex>0 ? setImgIndex(imgIndex-1):setImgIndex(3)
  }*/

  return (
    <div className={`modal ${isModalOpened ? 'modal_opened': ''}`}>
      <div className="modal__container">
        <Gallery isLightbox={true} isModalOpened={isModalOpened} onOpenModal={onOpenModal}/>
      </div>

    </div>
  );
}
/*children --> Gallery add icons*/
export default ModalWindow;
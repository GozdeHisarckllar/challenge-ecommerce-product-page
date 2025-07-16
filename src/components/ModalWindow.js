import Gallery from './Gallery';

const ModalWindow = ({ productData, isModalOpened, onOpenModal, onCloseModal, onSetImgStartIndex, imgStartIndex }) => {

  return (
    <div className={`modal ${isModalOpened ? 'modal_opened': ''}`}>
      <div className="modal__container">
        <Gallery
          productData={productData}
          isLightbox={true} 
          isModalOpened={isModalOpened} 
          onOpenModal={onOpenModal} 
          onCloseModal={onCloseModal}
          onSetImgStartIndex={onSetImgStartIndex}
          imgStartIndex={imgStartIndex}
        />
      </div>

    </div>
  );
}

export default ModalWindow;
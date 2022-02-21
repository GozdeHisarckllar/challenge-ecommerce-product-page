import { useEffect, useState } from 'react';

const Gallery = ({ productData, isLightbox, isModalOpened, onOpenModal, onCloseModal }) => {

  const [activeImg, setActiveImg] = useState('image-product-1');
  const [sliderAnimation, setSliderAnimation] = useState(false);
  const [sliderLightboxAnimation, setSliderLightboxAnimation] = useState(false);
  const [sliderMobileAnimation, setSliderMobileAnimation] = useState(false);
  const regex = /image-product-\d/;
  let sourceString;
  const images = productData[0].images;//if there is mode data, mapping for Gallery and product data can be used

   
  function handleImgClick(event) {
    if (event.target.classList.contains('gallery__img')) {
      sourceString = event.target.src.toString();
    } else {
      sourceString = event.target.querySelector('.gallery__img').src.toString();
    }
    
    const matchedImg = images.find((img) => {
      return img.regexMatch === sourceString.match(regex)[0];
    });
 
    setImgIndex(matchedImg.index);
  
    setActiveImg(matchedImg.regexMatch);
    
    setSliderAnimation(false);
  }

  const [imgIndex, setImgIndex] = useState(0);

  
  function handleRight() {
    imgIndex === images.length-1 ? setImgIndex(0): setImgIndex(imgIndex+1);
    setActiveImg(false);
  }

  function handleLeft() {
    imgIndex > 0 ? setImgIndex(imgIndex-1):setImgIndex(images.length-1);/*3*/
    setActiveImg(false);
  }

  function handleOpenModal() {
    onOpenModal();
  }

  useEffect(() => {
    if (!isModalOpened && !isLightbox ) {
      const triggerAnime = (event) => {
        if (event.target.classList.contains('gallery__thumbnail')) {
          setSliderAnimation(true);
        }
      }

      const stopAnime = (event) => {
        if (event.target.classList.contains('gallery__thumbnail')) {
          setSliderAnimation(false);
        }
      }

      const triggerMobileAnime = (event) => {
        if (event.target.classList.contains('gallery__btn')) {
          setSliderMobileAnimation(true);
        }
      }

      const stopMobileAnime = (event) => {
        if (event.target.classList.contains('gallery__btn')) {
          setSliderMobileAnimation(false);
        }
      }
        
      document.addEventListener('click', triggerAnime);
      document.addEventListener('mouseout', stopAnime);
      document.addEventListener('mouseup', triggerMobileAnime);
      document.addEventListener('mousedown', stopMobileAnime);

      return () => {
        document.removeEventListener('click', triggerAnime);
        document.removeEventListener('mouseout', stopAnime);
        document.removeEventListener('mouseup', triggerMobileAnime);
      document.removeEventListener('mousedown', stopMobileAnime);
      }
    } else if (isModalOpened && isLightbox) {

      const triggerLightBoxAnime = (event) => {
        if (event.target.classList.contains('gallery__thumbnail') || 
        event.target.classList.contains('gallery__btn')) {
          setSliderLightboxAnimation(true);
        }
      }

      const stopLightboxAnime = (event) => {
        if (event.target.classList.contains('gallery__thumbnail') || 
          event.target.classList.contains('gallery__btn')) {
          setSliderLightboxAnimation(false);
        }
      }
        
      document.addEventListener('mouseup', triggerLightBoxAnime);
      document.addEventListener('mousedown', stopLightboxAnime);

      return () => {
        document.removeEventListener('mouseup', triggerLightBoxAnime);
        document.removeEventListener('mousedown', stopLightboxAnime);
      }
    }
  }, [isLightbox, isModalOpened]);

  return(
    <section className='gallery'>
     
        <button className={`gallery__btn gallery__btn_prev ${isModalOpened&&isLightbox ? 'gallery__btn_visible' : ''}`} type='button' aria-label='show the previous image' onClick={handleLeft}></button>
        <button className={`gallery__btn gallery__btn_next ${isModalOpened&&isLightbox ? 'gallery__btn_visible' : ''}`} type='button' aria-label='show the next image' onClick={handleRight}></button>
        <button className={`gallery__close-btn ${isModalOpened&&isLightbox ? 'gallery__close-btn_visible' : ''}`} type='button' aria-label='close the gallery' onClick={onCloseModal}></button>
      
        <div className={`gallery__container ${isLightbox ? 'gallery__container_type_lightbox':'gallery__container_mobile'}`}>
          <picture className={`gallery__main ${sliderAnimation ? 'gallery__main_withAnimation': !isLightbox ? 'gallery__main_hover': /*''*/sliderLightboxAnimation ? 'gallery__main_withLightboxAnimation':''} ${isLightbox ? 'gallery__main_noevent':''} ${sliderMobileAnimation ? 'gallery__main_withLightboxAnimation':''}`} onClick={handleOpenModal}>
            <img  className='gallery__img gallery__img_main' src={images[imgIndex]['alias'] || images[0]['alias']} alt="item"/>
          </picture>
          <ul className={`gallery__thumbnail-container ${isLightbox ? 'gallery__thumbnail-container_type_lightbox':''}`}>
          {
            images.map((img) => (
              <li key= {img.index} className={`gallery__thumbnail ${(activeImg === img.regexMatch)||(imgIndex === img.index) ?'gallery__thumbnail_active':'gallery__thumbnail_hover'}`} onClick={handleImgClick}>
                <img  className='gallery__img gallery__img_thumbnail' src={img.alias} alt="appearence of the items from different angles"/>
              </li>
            ))
          }
          </ul>    
        </div>
      </section>
  );
}

export default Gallery;
import { useEffect, useState } from 'react';
/*import product1 from '../images/image-product-1.jpg';
import product2t from '../images/image-product-2.jpg';
import product3t from '../images/image-product-3.jpg';
import product4t from '../images/image-product-4.jpg';*/

const Gallery = ({ productData, isLightbox, isModalOpened, onOpenModal, onCloseModal }) => {

  const [galleryMainImg, setGalleryMainImg] = useState('');
  const [activeImg, setActiveImg] = useState('image-product-1');
  const [index, setIndex] = useState(0);
  const [sliderAnimation, setSliderAnimation] = useState(false);
  const regex = /image-product-\d/;
  let sourceString;
  const images = productData[0].images;
  
  /*const images = [
    {
      alias: product1,
      index: 0,
      regexMatch:'image-product-1'
    }, 
    {
      alias: product2t,
      index: 1,
      regexMatch:'image-product-2'
    }, 
    {
      alias: product3t,
      index: 2,
      regexMatch:'image-product-3'
    }, 
    {
      alias: product4t,
      index: 3,
      regexMatch:'image-product-4'
  }];*/

   
  function handleImgClick(event) {
    if (event.target.classList.contains('gallery__img')) {
      //setGalleryMainImg(event.target.src);
      sourceString = event.target.src.toString();
    } else {
      //setGalleryMainImg(event.target.querySelector('.gallery__img').src);
      sourceString = event.target.querySelector('.gallery__img').src.toString();
    }
    
    //setActiveImg(sourceString.match(regex)[0]);
    //console.log(sourceString.match(regex)[0]);

    
    ///////////////
    const matchedImg = images.find((img) => {
      return img.regexMatch === sourceString.match(regex)[0];
    });
  //setGalleryMainImg(matchedImg.alias);
  setImgIndex(matchedImg.index);
  //setIndex(matchedImg.index)
  setActiveImg(matchedImg.regexMatch);
    //setActiveImg(matchedImg.index);
    setSliderAnimation(false);
  }

  /*useState(() => {
    const img = images.find((img) => {
      return img.index === imgIndex;
    })
    console.log(imgIndex);
    

    //setGalleryMainImg(img.alias);
  });*/
  const [imgIndex, setImgIndex] = useState(0)

  ///////
  function handleRight() {
    imgIndex === 3 ? setImgIndex(0): setImgIndex(imgIndex+1);
    setActiveImg(false);
  }

  function handleLeft() {
    imgIndex>0 ? setImgIndex(imgIndex-1):setImgIndex(3);
    setActiveImg(false);
  }////////////

  function handleOpenModal() {
    onOpenModal();
  }

  useEffect(() => {
    if (!isModalOpened && !isLightbox ) {//add seperate anime for lightbox if lightbox === true
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
        
      document.addEventListener('click', triggerAnime);
      document.addEventListener('mouseout', stopAnime);

      return () => {
        document.removeEventListener('click', triggerAnime);
        document.removeEventListener('mouseout', stopAnime);
      }
    }
  }, [isLightbox, isModalOpened]);

  return( //lightbox ? small class : full     thum 50% --> grid justify-items:center
    <section className='gallery'>
      {isModalOpened&&isLightbox&&<div className='gallery__prev-btn' onClick={handleLeft}></div>}
      {isModalOpened&&isLightbox&&<div className='gallery__next-btn' onClick={handleRight}></div>}
      {isModalOpened&&isLightbox&&<div onClick={onCloseModal}></div>}
        <ul className='gallery__container'>
          <li className={`gallery__main ${sliderAnimation ? 'gallery__main_withAnimation': !isLightbox ? 'gallery__main_hover': ''}`} onClick={handleOpenModal}>
            <img  className='gallery__img gallery__img_main' src={images[imgIndex]['alias'] || images[0]['alias']} alt="item"/>
          </li>
          {
            images.map((img) => (
              <li key= {img.index} className={`gallery__thumbnail ${(activeImg === img.regexMatch)||(imgIndex === img.index) ?'gallery__thumbnail_active':'gallery__thumbnail_hover'}`} onClick={handleImgClick}>
                <img  className='gallery__img gallery__img_thumbnail' src={img.alias} alt="appearence of the items from different angles"/>
              </li>
            ))
          }    
        </ul>
      </section>
  );
}

export default Gallery;
/*<li className={`gallery__thumbnail ${(activeImg === 'image-product-1')||(imgIndex===0) ?'gallery__thumbnail_active':'gallery__thumbnail_hover'}`} onClick={handleImgClick}>
            <img  className='gallery__img gallery__img_thumbnail' src={product1} alt="item"/>
          </li>
          <li className={`gallery__thumbnail ${(activeImg === 'image-product-2')||(imgIndex===1)?'gallery__thumbnail_active':'gallery__thumbnail_hover'}`} onClick={handleImgClick}>
            <img  className='gallery__img gallery__img_thumbnail' src={product2t} alt="item"/>
          </li>
          <li className={`gallery__thumbnail ${(activeImg === 'image-product-3')||(imgIndex===2)?'gallery__thumbnail_active':'gallery__thumbnail_hover'}`} onClick={handleImgClick}>
            <img  className='gallery__img gallery__img_thumbnail' src={product3t} alt="item"/>
          </li>
          <li className={`gallery__thumbnail ${(activeImg === 'image-product-4')||(imgIndex===3)?'gallery__thumbnail_active':'gallery__thumbnail_hover'}`} onClick={handleImgClick}>
            <img  className='gallery__img gallery__img_thumbnail' src={product4t} alt="item"/>
          </li>*/
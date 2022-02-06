import product1 from '../images/image-product-1.jpg';
import product1thumbnail from '../images/image-product-1-thumbnail.jpg';
import product2t from '../images/image-product-2.jpg';
import product3t from '../images/image-product-3.jpg';
import product4t from '../images/image-product-4.jpg';


const productData = [{
  id: '01',
  label: 'Sneaker Company',
  title: 'Fall Limited Edition Sneakers',
  description: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.',
  salePrice : 125.00,
  listPrice: 250.00,
  images : [
    {
      alias: product1,
      index: 0,
      regexMatch:'image-product-1',
      thumbnail: product1thumbnail
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
  }]
}];

export default productData;
/*galleryMainImages: ['../images/image-product-1.jpg','../images/image-product-2.jpg', '../images/image-product-3.jpg', '../images/image-product-4.jpg'],
  thumbnailImages: ['../images/image-product-1-thumbnail.jpg', '../images/image-product-2-thumbnail.jpg', '../images/image-product-3-thumbnail.jpg', '../images/image-product-4-thumbnail.jpg']*/

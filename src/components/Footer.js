import { Link } from "react-router-dom";

const Footer = () => {
  return(
    <footer className="footer">
      <p className="footer__info footer__info_type_author" >© 2022. Gözde Hisarcıklılar</p>
      <p className="footer__info footer__info_type_description">Coded for the challenge by <Link className='footer__info-link' to={{pathname:"https://www.frontendmentor.io"}} target='_blank'>Frontend Mentor</Link> </p>
    </footer>
  );
}

export default Footer;
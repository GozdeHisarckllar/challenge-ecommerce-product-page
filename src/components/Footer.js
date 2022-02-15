import { Link } from "react-router-dom";

const Footer = () => {
  return(
    <footer className="footer">
      <p className="footer__info footer__info_type_author" >© 2022. Coded by Gözde Hisarcıklılar</p>
      <p className="footer__info footer__info_type_attribution">Challenge by <Link className='footer__attribution-link' to={{pathname:"https://www.frontendmentor.io?ref=challenge"}} target='_blank'>Frontend Mentor</Link> </p>
    </footer>
  );
}

export default Footer;
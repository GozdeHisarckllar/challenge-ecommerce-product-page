import { Link } from "react-router-dom";

const Navbar = ({ navbarModifier, linkModifier }) => {
  return(
    <nav className={`header__navbar ${navbarModifier}`}>
      {
      ['Collections', 'Women', 'Men', 'About', 'Contact'].map((navItem, i) => (
        <Link key={i} className={`header__navbar-link ${linkModifier}`} to="#">{navItem}</Link>
      ))
    }
    </nav>
  );
}

export default Navbar;
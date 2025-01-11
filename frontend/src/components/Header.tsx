import './header.css';
import Logo from './Logo';
import Nav from './nav/Nav';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <Logo />
      <SearchBar />
      <Nav />
    </header>
  )
}

export default Header;
import './header.css';
import Logo from './Logo';
import Nav from './Nav/Nav';
import SearchBar from './SearchBar';

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <Logo />
      <SearchBar onSearch={() => {}}/>
      <Nav />
    </header>
  )
}

export default Header;
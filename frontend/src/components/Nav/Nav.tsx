import './nav.css';
import NavAvatar from './NavAvatar';
import NavNotice from './NavNotice';
import NavOnOff from './NavOnOff';

function Nav() {
  return (
    <nav className='header-nav ms-auto'>
      <ul className='d-flex align-items-center'>
        <NavNotice />
        <NavAvatar />
        <NavOnOff />
      </ul>
    </nav>
  )
}

export default Nav;
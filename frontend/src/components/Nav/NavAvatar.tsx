import placeholderImg from '../../assets/vite.svg';
import DropdownItem from './DropdownItem';

function NavAvatar() {
  // Hardcoded for now
  return (
    <li className='nav-item dropdown pe-3' >
      <a className='nav-link nav-profile d-flex align-items-center pe-0' href="#" data-bs-toggle='dropdown'>
        <img src={placeholderImg} alt='Profile' className='rounded-circle'/>
        <span className='d-none d-md-block dropdown-toggle ps-2'>C. Cloud</span>
      </a>

      <ul className='dropdown-menu dropdown-menu-end profile'>
        <li className='dropdown-header'>
          <h6>Charged Cloud</h6>
          <span>Admin</span>
        </li>

        <DropdownItem icon='bi-person' label='Perfil' />
        <DropdownItem icon='bi-gear' label='Minha Conta' />
        <DropdownItem icon='bi-question-circle' label='FAQ' />
        <DropdownItem icon='bi-arrow-right' label='Sair' />

      </ul>
    </li>
  )
}

export default NavAvatar;
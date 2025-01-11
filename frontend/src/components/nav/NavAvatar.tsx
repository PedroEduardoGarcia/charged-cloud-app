import placeholderImg from '../../../public/vite.svg';

function NavAvatar() {
  // Hardcoded for now
  return (
    <li className='nav-item dropdown pe-3' >
      <a className='nav-link nav-profile d-flex align-items-center pe-0' href="#" data-bs-toggle='dropdown'>
        <img src={placeholderImg} alt='Profile' className='rounded-circle'/>
        <span className='d-none d-md-block dropdown-toggle ps-2'>C. Cloud</span>
      </a>

      <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
        <li className='dropdown-header'>
          <h6>Charged Cloud</h6>
          <span>Admin</span>
        </li>

        <li>
          <hr className='dropdown-divider'></hr>
        </li>

        <li>
          <a className='dropdown-item d-flex align-items-center' href='#'>
            <i className='bi bi-person'></i>
            <span>Profile</span>
          </a>
        </li>

        <li>
          <hr className='dropdown-divider'></hr>
        </li>

        <li>
          <a className='dropdown-item d-flex align-items-center' href='#'>
            <i className='bi bi-gear'></i>
            <span>Account</span>
          </a>
        </li>

        <li>
          <hr className='dropdown-divider'></hr>
        </li>

        <li>
          <a className='dropdown-item d-flex align-items-center' href='#'>
            <i className='bi bi-question-circle'></i>
            <span>FAQ</span>
          </a>
        </li>

        <li>
          <hr className='dropdown-divider'></hr>
        </li>

        <li>
          <a className='dropdown-item d-flex align-items-center' href='#'>
            <i className='bi bi-arrow-right'></i>
            <span>Sign Out</span>
          </a>
        </li>

      </ul>
    </li>
  )
}

export default NavAvatar;
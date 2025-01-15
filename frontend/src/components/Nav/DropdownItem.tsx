interface DropdownItemProps {
  icon: string;
  label: string;
  href?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ icon, label, href = '#' }) => (
  <>
    <li>
      <hr className='dropdown-divider'></hr>
    </li>
    <li>
      <a className='dropdown-item d-flex align-items-center' href={href}>
        <i className={`bi ${icon}`}></i>
        <span>{label}</span>
      </a>
    </li>
  </>
);

export default DropdownItem;

interface SidebarSubItemProps {
  icon: string;
  label: string;
  href: string;
  onClick?: () => void;
}

const SidebarSubItem: React.FC<SidebarSubItemProps> = ({ icon, label, href, onClick }) => {
  return (
    <li>
      <a href={href} onClick={onClick}>
        <i className={`bi ${icon}`}></i>
        <span>{label}</span>
      </a>
    </li>
  );
};

export default SidebarSubItem;

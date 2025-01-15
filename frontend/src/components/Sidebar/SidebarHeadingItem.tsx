interface SidebarHeadingItemProps {
  icon: string;
  label: string;
  href: string;
  isCollapsed?: boolean;
}

const SidebarHeadingItem: React.FC<SidebarHeadingItemProps> = ({ icon, label, href, isCollapsed = true }) => {
  return (
    <li className="nav-item">
      <a className={`nav-link ${isCollapsed ? 'collapsed' : ''}`} href={href}>
        <i className={icon}></i>
        <span>{label}</span>
      </a>
    </li>
  );
};

export default SidebarHeadingItem;

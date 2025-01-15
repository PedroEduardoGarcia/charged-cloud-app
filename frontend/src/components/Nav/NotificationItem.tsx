interface NotificationItemProps {
  icon: string;
  iconClass?: string;
  title: string;
  description: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  icon,
  iconClass = '',
  title,
  description,
  time,
}) => (
  <>
    <li>
      <hr className='dropdown-divider'></hr>
    </li>
    <li className='notification-item'>
      <i className={`bi ${icon} ${iconClass}`}></i>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
        <p>{time}</p>
      </div>
    </li>
  </>
);

export default NotificationItem;

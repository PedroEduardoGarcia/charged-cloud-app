import NotificationItem from "./NotificationItem";

function NavNotice() {
  // Hardcoded for now
  return (
    <li className='nav-item dropdown'>
      <a className='nav-link nav-icon' href='#' data-bs-toggle='dropdown'>
        <i className='bi bi-bell'></i>
        <span className='badge bg-primary badge-number'>3</span>
      </a>

      <ul className='dropdown-menu dropdown-menu-end notifications'>
        <li className='dropdown-header'>
          Você tem 3 notificações
          <a href='#'>
            <span className='badge rounded-pill bg-primary p-2 ms-2'>
              Ver todas
            </span>
          </a>
        </li>

        <NotificationItem 
          icon='bi-exclamation-circle'
          iconClass='text-warning'
          title='Lorem Ipsum'
          description='Quae dolorem earum veritatis'
          time='30 min. ago'
        />
        <NotificationItem
          icon='bi-check-circle'
          iconClass='text-success'
          title='Lorem Ipsum'
          description='Quae dolorem earum veritatis'
          time='1 hr ago'
        />
        <NotificationItem
          icon='bi-x-circle'
          iconClass='text-danger'
          title='Lorem Ipsum'
          description='Quae dolorem earum veritatis'
          time='2 hr ago'
        />
        
        <li>
          <hr className='dropdown-divider'></hr>
        </li>

        <li className='dropdown-footer'>
          <a href='#'>Ver todas notificações</a>
        </li>
      </ul>
    </li>
  )
}

export default NavNotice;
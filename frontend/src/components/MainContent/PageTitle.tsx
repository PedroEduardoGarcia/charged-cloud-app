function PageTitle({ title }: { title: string }) {
  return (
    <div className='pagetitle'>
      <h1>Dashboard</h1>
      <nav>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <a href='#'>
              <i className='bi bi-house-door'></i>
            </a>
          </li>

          {title !== "Dashboard" && (
            <li className='breadcrumb-item active'>Empresa</li>
          )}
          <li className='breadcrumb-item active'>{title}</li>
        </ol>
      </nav>
    </div>
  )
}

export default PageTitle;
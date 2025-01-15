import './sidebar.css';
import SidebarHeadingItem from './SidebarHeadingItem';
import SidebarSubItem from './SidebarSubItem';

function SideBar({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <aside className='sidebar' id='sidebar'>
      <ul className='sidebar-nav' id='sidebar-nav'>
        <li className='nav-item'>
          <a className='nav-link' href='#' onClick={() => onNavigate("Dashboard")}>
            <i className='bi bi-grid'></i>
            <span>Dashboard</span>
          </a>
        </li>

        <li className='nav-item'>
          <a className='nav-link collapsed' href='#' data-bs-target='#components-nav' data-bs-toggle='collapse'>
            <i className='bi bi-menu-button-wide'></i>
            <span>Empresas</span>
            <i className='bi bi-chevron-down ms-auto'></i>
          </a>
          <ul className='nav-content collapse' id='components-nav' data-bs-parent='#sidebar-nav'>
            <SidebarSubItem icon="bi-circle" label="Mostrar todas" href="#" onClick={() => onNavigate("Mostrar todas")} />
            <SidebarSubItem icon="bi-circle" label="Buscar" href="#" onClick={() => onNavigate("Buscar")} />
            <SidebarSubItem icon="bi-circle" label="Adicionar" href="#"  onClick={() => onNavigate("Adicionar")} />
            <SidebarSubItem icon="bi-circle" label="Editar" href="#" onClick={() => onNavigate("Editar")}/>
          </ul>
        </li>

        <li className='nav-item'>
          <a className='nav-link collapsed' href='#' data-bs-target='#documents-nav' data-bs-toggle='collapse'>
            <i className='bi bi-journal-text'></i>
            <span>Documentos</span>
            <i className='bi bi-chevron-down ms-auto'></i>
          </a>
          <ul className='nav-content collapse' id='documents-nav' data-bs-parent='#documents-nav'>
            <SidebarSubItem icon="bi-circle" label="Clientes" href="#" />
            <SidebarSubItem icon="bi-circle" label="Fornecedores" href="#" />
            <SidebarSubItem icon="bi-circle" label="Logística" href="#" />
            <SidebarSubItem icon="bi-circle" label="TI" href="#" />
          </ul>
        </li>

        <li className='nav-heading'>Páginas</li>
        <SidebarHeadingItem icon='bi bi-person' label='Perfil' href='#' />
        <SidebarHeadingItem icon='bi bi-envelope' label='Contato' href='#' />
        <SidebarHeadingItem icon='bi bi-card-list' label='Registrar' href='#' />
        <SidebarHeadingItem icon='bi bi-box-arrow-in-right' label='Login' href='#' />
        <SidebarHeadingItem icon='bi bi-gear' label='Opções' href='#' />
        <SidebarHeadingItem icon='bi bi-question-circle' label='FAQ' href='#' />
      </ul>
    </aside>
  )
}

export default SideBar;
import GetCompany from './Company/GetCompany';
import AddCompany from './Company/AddCompany';
import Dashboard from './Dashboard/Dashboard';
import './mainContent.css';
import PageTitle from './PageTitle';
import SearchCompany from './Company/SearchCompany';
import UpdateCompany from './Company/UpdateCompany';

function MainContent({ currentPage, onNavigate }: { currentPage: string; onNavigate: (page: string) => void }) {
  const renderContent = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Mostrar todas":
        return <GetCompany onNavigate={onNavigate}/>;
      case "Buscar":
        return <SearchCompany />;
      case "Adicionar":
        return <AddCompany />
      case "Editar":
        return <UpdateCompany />
      default:
        return <div>Seleciona uma página de dashboard</div>;
    }
  };

  return (
    <main id='main' className='main'>
      <PageTitle title={currentPage}/>
      {renderContent()}
    </main>
  )
}

export default MainContent;
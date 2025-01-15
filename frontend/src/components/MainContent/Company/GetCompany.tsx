import CompanyTableWrapper from "./CompanyTableWrapper";

function GetCompany({ onNavigate }: { onNavigate: (page: string) => void }) {
  
  return (
    <section className='dashboard section'>
      <div className='row'>
        <div className="col-12">
          <CompanyTableWrapper title="Empresa" subtitle="Mostrar todas" onNavigate={onNavigate}/>
        </div>
      </div>
    </section>
  )
}

export default GetCompany;
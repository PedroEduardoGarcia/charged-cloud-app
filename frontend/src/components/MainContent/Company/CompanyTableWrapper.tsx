import CompanyTable from "./CompanyTable";

function CompanyTableWrapper({ title, subtitle }: { title: string; subtitle: string; onNavigate: (page: string) => void }) {
  return (
    <div className="card recent-companies overflow-auto">
      <div className="card-body">
        <h5 className="card-title">{title} <span>| {subtitle}</span></h5>
        <CompanyTable  />
      </div>
    </div>
  );
}

export default CompanyTableWrapper;
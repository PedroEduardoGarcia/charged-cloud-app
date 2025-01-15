interface CompanyDetailsProps {
  company: {
    id: string;
    cnpj: string;
    name: string;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
  };
}

function CompanyDetails({ company }: CompanyDetailsProps) {
  return (
    <div className="company-details">
      <div className="card-body">
        <h5 className="card-title">{company.name}</h5>
        <p className="card-text"><strong>CNPJ:</strong> {company.cnpj}</p>
        <p className="card-text"><strong>Endereço:</strong> {company.address}</p>
        <p className="card-text"><strong>Telefone:</strong> {company.phone}</p>
        <p className="card-text"><strong>Criado em:</strong> {new Date(company.createdAt).toLocaleString()}</p>
        <p className="card-text"><strong>Atualizado em:</strong> {new Date(company.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CompanyDetails;

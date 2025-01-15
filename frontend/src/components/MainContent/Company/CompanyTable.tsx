import { useEffect, useState } from "react";
import { dbService } from "../../../db/dbService";
import { ERROR_MESSAGES, getErrorMessage } from "../../../utils/errorMessages";

interface Company {
  id: string;
  cnpj: string;
  name: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

function CompanyTable() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3001/v1/company");
      if (!response.ok) throw new Error(ERROR_MESSAGES.FETCH_FAILED);
      const data = await response.json();
      setCompanies(data);
    } catch (err: any) {
      setError(getErrorMessage(err));
      
      const offlineData = await dbService.getAllCompanies()
      if (offlineData.length > 0) {
        setCompanies(offlineData);
        setError(ERROR_MESSAGES.OFFLINE);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    {loading && <p className="loading-text">Carregando...</p>}
    {error && <p className="error-text">{error}</p>}
    <table className="table table-borderless datatable">
      <thead className="table-light">
        <tr>
          <th scope="col">CNPJ</th>
          <th scope="col">Nome</th>
          <th scope="col">Endereço</th>
          <th scope="col">Telefone</th>
        </tr>
      </thead>
      <tbody>
        {companies && companies.length >0 && 
        companies.map(item => (
          <tr key={item.id}>
            <th scope="row">
              <a href="#">{item.cnpj}</a>
            </th>
            <td>{item.name}</td>
            <td>
              <a href="#" className="text-primary">{item.address}</a>
            </td>
            <td className="table-phone">{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default CompanyTable;
import { useState } from "react";
import SearchBar from "../../SearchBar";
import CompanyDetails from "./CompanyDetails";
import { dbService } from "../../../db/dbService";
import { ERROR_MESSAGES, getErrorMessage } from "../../../utils/errorMessages";


function SearchCompany() {
  const [company, setCompany] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query) {
      setError(ERROR_MESSAGES.EMPTY_QUERY);
      return;
    }
    setLoading(true);
    setError("");
    setCompany(null);

    try {
      const response = await fetch(`http://localhost:3001/v1/company/${query}`);
      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.NOT_FOUND);
      }
      const data = await response.json();
      setCompany(data);
    } catch (err: any) {
      const offlineCompany = await dbService.getCompany(query);
      const fallbackMessage = offlineCompany ? ERROR_MESSAGES.OFFLINE : getErrorMessage(err);
      setError(fallbackMessage);
      if (offlineCompany && offlineCompany.syncStatus !== "deleted") {
        setCompany(offlineCompany);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='dashboard section'>
      <div className="card ">
        <div className="card-body">
          <h5 className="card-title">Empresa <span>| Buscar</span></h5>
          <div className="search-input-group">
            <p>Buscar Empresa: </p>
            <SearchBar onSearch={handleSearch} />
          </div>

          {loading && <p className="loading-text">Carregando...</p>}
          {error && <p className="error-text">{error}</p>}
          {company && <CompanyDetails company={company} />}
          </div>
      </div>
    </section>
  );
}

export default SearchCompany;

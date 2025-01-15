import { useState } from "react";
import SearchBar from "../../SearchBar";
import { dbService } from "../../../db/dbService";
import { ERROR_MESSAGES, getErrorMessage } from "../../../utils/errorMessages";

function UpdateCompany() {
  const [company, setCompany] = useState<any>(null); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleSearch = async (query: string) => {
    if (!query) {
      setError(ERROR_MESSAGES.EMPTY_QUERY);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setCompany(null);

    try {
      const response = await fetch(`http://localhost:3001/v1/company/${query}`);
      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.NOT_FOUND);
      }
      const data = await response.json();
      setCompany(data);
      setFormData({
        name: data.name || "",
        address: data.address || "",
        phone: data.phone || "",
      });
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro.");
      const offlineCompany = await dbService.getCompany(query);
      if (offlineCompany && offlineCompany.syncStatus !== "deleted") {
        setCompany(offlineCompany);
        setFormData({
          name: offlineCompany.name || "",
          address: offlineCompany.address || "",
          phone: offlineCompany.phone || "",
        });
        setError(ERROR_MESSAGES.OFFLINE);
      } else {
        setError(getErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !company.cnpj) {
      setError(ERROR_MESSAGES.NOT_FOUND);
      return;
    }

    setUpdating(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3001/v1/company/${company.cnpj}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.UPDATE_FAILED);
      }

      setSuccess("Empresa editada com sucesso!");
    } catch (err: any) {
      const offlineCompany = await dbService.getCompany(company.cnpj);

      if (offlineCompany && offlineCompany.syncStatus !== "deleted") {
        setCompany(offlineCompany);
        setFormData({
          name: offlineCompany.name || "",
          address: offlineCompany.address || "",
          phone: offlineCompany.phone || "",
        });
        setError(ERROR_MESSAGES.OFFLINE);
      } else {
        setError(getErrorMessage(err));
      }

      await dbService.saveCompany(
        {
          ...company,
          name: formData.name,
          address: formData.address,
          phone: formData.phone,
        },
        "updated"
      );
      setFormData({
        name: formData.name || "",
        address: formData.address || "",
        phone: formData.phone || "",
      });
      setSuccess("Empresa editada com sucesso!");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !company.cnpj) {
      setError(ERROR_MESSAGES.NOT_FOUND);
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:3001/v1/company/${company.cnpj}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || ERROR_MESSAGES.DELETE_FAILED);
      }

      setSuccess("Empresa deletada com sucesso!");
      await dbService.deleteCompany(company.cnpj);

      setCompany(null);
    } catch (err: any) {
      const offlineCompany = await dbService.getCompany(company.cnpj);
      if (offlineCompany && offlineCompany.syncStatus !== "deleted") {
        setCompany(offlineCompany);
        setFormData({
          name: offlineCompany.name || "",
          address: offlineCompany.address || "",
          phone: offlineCompany.phone || "",
        });
        setError(ERROR_MESSAGES.OFFLINE);
      } else {
        setError(getErrorMessage(err));
      }

      await dbService.saveCompany(company, "deleted");
      setSuccess("Empresa deletada com sucesso!");
      setCompany(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="dashboard section">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Empresa <span>| Editar</span></h5>
          <div className="search-input-group">
            <p>Buscar Empresa: </p>
            <SearchBar onSearch={handleSearch} />
          </div>
          {loading && <p className="loading-text">Carregando...</p>}
          {company && (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>CNPJ</label>
              <input
                type="text"
                value={company.cnpj}
                disabled
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className={`button-fixed-size btn btn-primary w-20 mt-4 ${updating ? "btn-loading" : ""}`}
              disabled={updating}
            >
              {updating ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                </>
              ) : (
                <>
                  Editar
                </>
              )}
            </button>
            
            <button
              type="button"
              className={`button-fixed-size btn btn-danger  mt-4 ms-2 ${deleting ? "btn-loading" : ""}`}
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                </>
              ) : (
                <>
                  Deletar
                </>
              )}
            </button>
          </form>
          )}
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text text-success">{success}</p>}
        </div>
      </div>
    </section>
  );
}

export default UpdateCompany;

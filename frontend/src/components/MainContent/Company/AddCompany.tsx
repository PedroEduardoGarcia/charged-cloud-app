import { useState } from "react";
import CNPJUtil from "../../../utils/CNPJUtil";
import { dbService } from "../../../db/dbService";

function AddCompany() {
  const [form, setForm] = useState({ cnpj: "", name: "", address: "", phone: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cnpj") {
      const cleanedValue = value.replace(/[^\d]/g, "");
      const formattedValue = cleanedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
      setForm((prev) => ({ ...prev, cnpj: formattedValue }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const generateRandomData = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/v1/generator");
      if (!response.ok) {
        throw new Error("Falha ao gerar dados aleatórios.");
      }
      const data = await response.json();
      setForm(data);
      setSuccess("Empresa gerada com sucesso!");
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const cleanedCNPJ = form.cnpj.replace(/[^\d]/g, "");

    if (!CNPJUtil.validate(form.cnpj)) {
      setError("CNPJ inválido.");
      return;
    }

    if (!CNPJUtil.validate(cleanedCNPJ)) {
      setError("CNPJ inválido.");
      return;
    }

    if (!form.cnpj || !form.name || !form.address || !form.phone) {
      setError("Todos os campos têm que ser preenchidos.");
      return;
    }

    setLoading(true);

    try {
      
      const response = await fetch("http://localhost:3001/v1/company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
        cnpj: cleanedCNPJ,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao adicionar empresa.");
      }

      setSuccess("Empresa adicionada com sucesso!");
      setForm({ cnpj: "", name: "", address: "", phone: "" });

      const newCompany = await response.json();

      await dbService.saveCompany(newCompany, "synced");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro.");
      const companyData = {
        id: cleanedCNPJ,
        cnpj: cleanedCNPJ,
        name: form.name,
        address: form.address,
        phone: form.phone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        syncStatus: "added",
      };
      await dbService.saveCompany(companyData, "added");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="dashboard section">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Empresa <span>| Adicionar</span></h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cnpj" className="form-label">
              CNPJ
            </label>
            <input
              type="text"
              className="form-control"
              id="cnpj"
              name="cnpj"
              value={form.cnpj}
              onChange={handleInputChange}
              maxLength={18}
              placeholder="00.000.000/0000-00"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Company Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Endereço
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Telefone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
          <div className="d-flex">
            <button
              type="submit"
              className={`btn btn-primary me-3 ${loading ? "btn-loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Adicionando..." : "Adicionar"}
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${loading ? "btn-loading" : ""}`}
              onClick={generateRandomData}
              disabled={loading}
            >
              {loading ? "Gerando..." : "Gerar Dados Aleatórios"}
            </button>
            </div>
        </form>
      </div>
    </div>
    </section>
  );
}

export default AddCompany;

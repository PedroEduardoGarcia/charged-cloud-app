import { useState } from 'react';
import './searchBar.css';

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <div className='search-bar'>
      <form className='search-form d-flex align-items-center' onSubmit={handleSubmit}>
        <input
            type="text"
            name="query"
            placeholder="Digite o CNPJ"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            title="Enter search keyword"
          />
        <button type='submit' title='Search'>
          <i className='bi bi-search'></i>
        </button>
      </form>
    </div>
  )
}

export default SearchBar;
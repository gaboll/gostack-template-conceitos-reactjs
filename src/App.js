import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('/repositories')

      setRepositories(response.data);
    };

    loadRepositories();
  }, [repositories]);

  async function handleAddRepository() {
    api.post('/repositories', {
      title,
      url: "",
      techs: []
    });

    setTitle('')
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
        </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      <div className="input-container">
        <input
          placeholder="Título do Repositório"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;

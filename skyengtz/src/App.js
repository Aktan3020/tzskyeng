

import './main.css';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
function App() {
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(null);
  const [total_count, setTotal_count] = useState(null);
  const [sort, setSort] = useState(false);
  const [reverset, setReverset] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.github.com/search/users?q=${search}&page=${page}&per_page=10${
        sort ? '&sort=repositories' : ''
      }${reverset ? '&order=desc' : ''}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.items);
        setTotal_count(data.total_count);
      });
  }, [search, page, sort, reverset]);

  return (
    <div className="App">
      <header>
        <nav className="nav">
          <input
            placeholder="поиск"
            onChange={(e) => setSearch(e.target.value)}
          />
          <span>
            <button
              onClick={() => {
                setSort(true)           
              }}
            >
              сортировать по убыванию
            </button>
            <button
              onClick={() => {
                setSort(false)
              }}
            >
              сортировать по возрастанию
            </button>
          </span>
        </nav>
      </header>
      <main>
        <div className="container">
          <div className="users">
            {users !== null ? (
              users.map((el, index) => (
              <Link to={'/'+el.login} key={index}> 
                  <h3>id:{el.id}</h3>
                  <h3>login:{el.login}</h3>
                  <img src={el.avatar_url} alt={el.login} />
                  <a href={el.html_url}>github</a>
              </Link> 
              ))
            ) : (
              <div>загрузка...</div>
            )}
          </div>
          <Stack spacing={2}>
            <Pagination
              count={
                total_count >= 1000 ? 100 : Math.ceil(total_count / 10)
              }
              variant="outlined"
              shape="rounded"
              onChange={(e, v) => setPage(v)}
              style={{ display: 'flex', justifyContent: 'center' }}
            />
          </Stack>
        </div>
      </main>
    </div>
  );
}

export default App;


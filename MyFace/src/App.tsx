import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {PostsPage} from "./PostsPage/PostsPage";
import {UsersPage} from "./UsersPage/UsersPage";
import {CreatePost} from "./CreatePost/CreatePost";
import {CreateUser} from "./CreateUser/CreateUser";

export function App() {
  return (
    <>
    <Router>
      <h1>Home Page</h1>
      <Routes>
        <Route path="/posts" 
          element={<PostsPage />}/>
          <Route path="/createposts" 
          element={<CreatePost />}/>
        <Route path="/users"
           element={<UsersPage/>}/>
        <Route path="/createusers"
           element={<CreateUser/>}/>   
        <Route path="*"
          element={<div>
            Sorry - that page doesn't exist, try these:
            <Link to="/posts "/>
            {/* <Link to="/users"/> */}
          </div>}/>
      </Routes>
    </Router>
    </>
  );
}

/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
*/

export default App

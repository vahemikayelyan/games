import { Provider } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Belote from "./components/belote/Belote";
import Home from "./components/home/Home";
import { store } from "./store";

function App() {
  return (
    <>
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/belote">Contact</Link>
        </li>
      </nav>
      <div className="App">
        <Provider store={store}>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/belote" element={<Belote />}></Route>
          </Routes>
        </Provider>
      </div>
    </>
  );
}

export default App;

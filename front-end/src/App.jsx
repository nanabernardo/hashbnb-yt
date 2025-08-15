import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import { UserContextProvider } from "./contexts/UserContextProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Resgister";
import Account from "./pages/Account";
import Header from "./components/Header";
import Place from "./pages/Place";

axios.defaults.baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "http://localhost:3000/api";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage/:action?/:id?" element={<Account />} />
          <Route path="/place/:id" element={<Place />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;

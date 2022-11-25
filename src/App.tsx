import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:id" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search?keyword" element={<Search />} />
      </Routes>
    </Router>
  );
}

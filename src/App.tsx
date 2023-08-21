import { Routes, Route } from "react-router-dom";
import { Nav } from "./components";
import { Home, Tasks, Create } from "./pages";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/:id" element={<Tasks />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import data from "./data";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <a href="/">sari-sari</a>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

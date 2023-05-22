// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES -> connects to Components folder for display 
import Edit from "./Pages/Edit";
import FourOFour from "./Pages/FourOFour";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";

// COMPONENTS
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rocks" element={<Index />} />
            <Route path="/rocks/new" element={<New />} />
            <Route exact path="/rocks/:id" element={<Show />} />
            <Route path="/rocks/:id/edit" element={<Edit />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
          
        </main>
      </Router>
    </div>
  );
}

export default App;

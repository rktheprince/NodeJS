import history from "./components/History";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Show from "./components/Show";
import One from "./components/One";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Router forceRefresh={true}> */}
      <Router history={history}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Show />} />
          <Route exact path="/add" element={<Form />} />
          <Route exact path="/one" element={<One />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

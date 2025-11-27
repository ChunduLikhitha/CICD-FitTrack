import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Register from "./Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default: show Register first */}
        <Route path="/" element={<Register />} />

        {/* Home only after login redirect */}
        <Route path="/home" element={<Home />} />

        {/* Explicit routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback for unknown URLs */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

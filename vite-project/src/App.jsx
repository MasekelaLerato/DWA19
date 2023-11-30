import  { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/login.css";
import "./App.css";
import LoginPage from "./components/login";
import Homepage from "./components/homepage";


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userOld = sessionStorage.getItem('user');
    if (userOld) {
      setUser(JSON.parse(userOld));
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <div>
    <Homepage/>
    <Router>
      <Routes>
        <Route path="/*" element={<LoginPage />} />
        {/* <Route path="/*" element={<Homepage />} /> */}
      </Routes>
    </Router>
    </div>
  );
};

export default App;

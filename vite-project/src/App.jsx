
import './App.css';

import Homepage from './components/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div>
      <Router>
        {
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        }
      </Router>
    
      <Homepage />
    </div>
  );
}

export default App;





















// import  { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./App.css";
// import LoginPage from "./components/LoginPage";
// import Homepage from "./components/Homepage";


// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userOld = sessionStorage.getItem('user');
//     if (userOld) {
//       setUser(JSON.parse(userOld));
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       sessionStorage.setItem('user', JSON.stringify(user));
//     }
//   }, [user]);

//   return (
//     <div>
     
//           <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//       </Routes>
//     </Router>
//     <Homepage/>
//     </div>
//   );
// };

// export default App;

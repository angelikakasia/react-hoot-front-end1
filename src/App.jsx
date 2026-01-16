import { Routes, Route, useNavigate} from "react-router"; // Import React Router
import { useContext, useState, useEffect } from "react";
// src/App.js

import NavBar from "./components/NavBar/Navbar";
// Import the SignUpForm component
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
// src/App.jsx

import HootForm from './components/HootForm/HootForm';

import "./App.css";
// src/App.jsx

import HootDetails from "./components/HootDetails/HootDetails";

import { UserContext } from "./contexts/UserContext";
import * as hootService from "./services/hootService.js";
import HootList from "./components/HootList/HootList";

// src/App.jsx

const App = () => {
  const { user } = useContext(UserContext);
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      console.log("hootsData:", hootsData);
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);
// src/App.jsx

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData);
    setHoots([...hoots, newHoot]);
    navigate('/hoots');
  };


  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Landing />} />
        // src/App.jsx
        {user ? (
          <>
            {/* Protected Routes (available only to signed-in users) */}
            <Route path="/hoots" element={<HootList hoots={hoots} />} />
            {/* Add this route! */}
            <Route path="/hoots/:hootId" element={<HootDetails />} />
            <Route path='/hoots/new' element={<HootForm />} />// src/App.jsx
            <Route 
              path='/hoots/new' 
              element={<HootForm handleAddHoot={handleAddHoot} />}
            />


          </>
        ) : (
          <>
            {/* Non-user Routes (available only to guests) */}
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;

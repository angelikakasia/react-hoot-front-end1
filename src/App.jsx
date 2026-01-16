import { useContext } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// src/App.jsx
import { Routes, Route } from 'react-router'; // Import React Router
import NavBar from './components/NavBar/Navbar';
// Import the SignUpForm component
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';
import { UserContext } from './contexts/UserContext';
// src/App.jsx

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <Routes>
        {/* Add the new `/` route! */}
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};


export default App;


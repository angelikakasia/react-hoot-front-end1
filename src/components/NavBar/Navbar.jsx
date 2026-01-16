// src/components/NavBar/NavBar.jsx

// Import the useContext hook
import { useContext } from 'react';

// Import Link from react-router-dom (NOT react-router)
import { Link } from 'react-router';

// Import the UserContext object
import { UserContext } from '../../contexts/UserContext';
// src/components/Navbar/Navbar.jsx

const NavBar = () => {
  // Get the setUser function from the UserContext
  const { user, setUser } = useContext(UserContext);

  // Add the handleSignOut function
  const handleSignOut = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Clear the user state
    setUser(null);
  };

// src/components/NavBar/NavBar.jsx

// src/components/NavBar/NavBar.jsx

  // src/components/NavBar/NavBar.jsx

  return (
    <nav>
      {user ? (
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/hoots'>HOOTS</Link></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <li><Link to='/'>HOME</Link></li>
          <li><Link to='/sign-in'>SIGN IN</Link></li>
          <li><Link to='/sign-up'>SIGN UP</Link></li>
        </ul>
      )}
    </nav>
  );



};


export default NavBar;

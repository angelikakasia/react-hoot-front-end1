// src/contexts/UserContext.jsx

import { createContext, useState } from 'react';

const UserContext = createContext();

// Add the new getUserFromToken function
// This function checks localStorage for a JWT,
// decodes it, and returns the user data if it exists.
const getUserFromToken = () => {
  const token = localStorage.getItem('token');

  // If there is no token, the user is not logged in
  if (!token) return null;

  // Decode the JWT payload and return the user data
  return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {
  // Create state just like you normally would in any other component
  // BUT initialize it using getUserFromToken so the user
  // stays logged in after a page refresh
  const [user, setUser] = useState(getUserFromToken());

  // This is the user state and the setUser function that will update it!
  // This variable name isn't special; it's just convention to use `value`.
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {/* The data we pass to the value prop above is now available to */}
      {/* all the children of the UserProvider component. */}
      {children}
    </UserContext.Provider>
  );
};

// When components need to use the value of the user context, they will need
// access to the UserContext object to know which context to access.
// Therefore, we export it here.
export { UserProvider, UserContext };

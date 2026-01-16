// src/components/SignUpForm/SignUpForm.jsx

// Import React hooks
import { useState, useContext } from 'react';

// Import navigation hook
import { useNavigate } from 'react-router';

// Import signup service (API call)
import { signUp } from '../../services/authService';

// Import the UserContext so we can access global user state
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  // Used to redirect the user after successful signup
  const navigate = useNavigate();

  // useContext lets us read values from UserContext
  // We only need setUser here to update global user state
  const { setUser } = useContext(UserContext);

  // Message state for displaying errors
  const [message, setMessage] = useState('');

  // Form state to track user input
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  // Destructure form values for easier use
  const { username, password, passwordConf } = formData;

  // Update form state when user types
  const handleChange = (evt) => {
    setMessage('');
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // Call the signup API
      const newUser = await signUp(formData);

      // Store the new user in global context
      setUser(newUser);

      // Redirect to home page after signup
      navigate('/');
    } catch (err) {
      // Show error message if signup fails
      setMessage(err.message);
    }
  };

  // Disable submit button if form is invalid
  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>

      {/* Display error message if any */}
      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="passwordConf">Confirm Password:</label>
          <input
            type="password"
            id="passwordConf"
            name="passwordConf"
            value={passwordConf}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;

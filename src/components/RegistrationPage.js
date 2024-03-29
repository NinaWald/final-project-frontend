import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../utils/urls';
import { loginUser, setDiscount, setUserId, logoutUser } from '../reducers/authReducer';
import LogoutButton from './LogoutButton';
import DeleteUser from './DeleteUser';
import '../registration.css'
import Loading from './Loading';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.userId)

  const [username, setUserName] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisteredMember, setIsRegisteredMember] = useState(false);
  const [, setSubmitted] = useState(false);
  // Assigning to an underscore to indicate it's intentionally unused
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    setUserName('');
    setUserEmail('');
    setPassword('');
    setSubmitted(false);
    setError(false);
    setErrorMessage('');
    setDeleteMessage('');
  }, []);

  const handleUserName = (e) => {
    setUserName(e.target.value);
    setSubmitted(false);
  };

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const handleRegistration = async () => {
    try {
      const registerResponse = await fetch(API_URL('register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          useremail,
          password
        })
      });

      if (registerResponse.ok) {
        setSubmitted(true);
        setError(false);
        setErrorMessage('You are now registered!');
      } else {
        setError(true);
        setErrorMessage('Registration failed. Please try again.');
      }
    } catch (e) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const loginResponse = await fetch(API_URL('login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          useremail,
          username,
          password
        })
      });

      if (loginResponse.ok) {
        const data = await loginResponse.json();
        const { username: responseUsername, accessToken, discount } = data.response;

        setSubmitted(true);
        setError(false);
        setUserName(responseUsername);

        dispatch(loginUser({ username: responseUsername, accessToken, userId: data.response.id }))

        dispatch(setDiscount(discount));
        dispatch(setUserId(data.response.id));
      } else {
        setError(true);
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (e) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || useremail === '' || password === '') {
      setError(true);
      setErrorMessage('Please fill in all the fields.');
    } else {
      setError(false);
      setErrorMessage('');
      if (isRegisteredMember) {
        handleLogin();
      } else {
        handleRegistration();
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setUserName('');
    setUserEmail('');
    setPassword('');
    setDeleteMessage('');
  };
  /* const clearFormFields = () => {
    setUserName('');
    setUserEmail('');
    setPassword('');
  };
*/
  const handleDeleteMessage = (message) => {
    setDeleteMessage(message);
  };

  return (
    <div className="form">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="discount">
            <h1>Get 10% discount! Become a member today!</h1>
          </div>

          <div className="messages">
            {deleteMessage && (
              <div className="success">
                <h1>{deleteMessage}</h1>
              </div>
            )}
            {errorMessage && (
              <div className="error">
                <h1>{errorMessage}</h1>
              </div>
            )}
            {!deleteMessage && !errorMessage && (
              <div className="placeholder">
                <h1>Member page</h1>
              </div>
            )}
          </div>

          {isLoggedIn !== null ? (
            <div className="success">
              {isLoggedIn ? (
                <>
                  <h1>Welcome to the member page, {username}!</h1>
                  <div className="member-buttons">
                    <LogoutButton onLogout={handleLogout} />
                    <DeleteUser onUserDeleted={() => handleDeleteMessage('Membership deleted successfully!')} />
                  </div>
                </>
              ) : (
                <h1>User successfully logged out!</h1>
              )}
            </div>
          ) : null}

          <form className="registration" onSubmit={handleSubmit}>
            <div className="regis-content">
              <label className="label" htmlFor="nameInput">
                <input
                  id="nameInput"
                  onChange={handleUserName}
                  className="input"
                  value={username}
                  type="text"
                  placeholder="name"
                  required />
              </label>
              <label className="label" htmlFor="emailInput">
                <input
                  id="emailInput"
                  onChange={handleUserEmail}
                  className="input"
                  value={useremail}
                  type="email"
                  placeholder="email"
                  required />
              </label>
              <label className="label" htmlFor="passwordInput">
                <input
                  id="passwordInput"
                  onChange={handlePassword}
                  className="input"
                  value={password}
                  type="password"
                  placeholder="password"
                  required />
              </label>

              <div className="toggle-container">
                <h1>Register/Login</h1>
              </div>
              <label className="toggle-switch-label" htmlFor="registeredMember">
                <div className="toggle-switch-container">
                  <input
                    id="registeredMember"
                    onChange={() => setIsRegisteredMember(!isRegisteredMember)}
                    className="toggle-switch-input"
                    type="checkbox"
                    checked={isRegisteredMember} />
                  <span className="toggle-switch-slider" />
                  <span className="toggle-switch-text">
                    {isRegisteredMember ? 'Log In' : 'Register'}
                  </span>
                </div>
              </label>

              <button className="button" type="submit">
                {isRegisteredMember ? 'Submit' : 'Submit'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
export default RegistrationPage;

/*
          <DeleteUser onUserDeleted={clearFormFields} />
*/
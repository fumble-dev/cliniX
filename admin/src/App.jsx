import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';

const App = () => {
  const { atoken } = useContext(AdminContext);

  return (
    <div>
      {atoken ? (
        <h1>Welcome Admin! 🎉 (Dashboard goes here)</h1>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;

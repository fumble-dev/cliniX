import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

  const currencySymbol = '₹';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
  const [userData, setUserdata] = useState(false)

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/doctor/list')
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const loadUserprofileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/get-profile',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (data.success) {
        setUserdata(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const value = {
    doctors,
    currencySymbol,
    token, setToken,
    backendUrl,
    userData, setUserdata,
    loadUserprofileData
  };

  useEffect(() => {
    getDoctorsData()
  }, [])

  useEffect(() => {
    if (token) {
      loadUserprofileData()
    } else {
      setUserdata(false)
    }
  }, [token])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;

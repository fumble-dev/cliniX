import axios from "axios";
import { useState, createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const [atoken, setAToken] = useState(localStorage.getItem("atoken") || "");
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { atoken } })
      if (data.success) {
        setDoctors(data.doctors)
        console.log(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { atoken } })
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
        getAllDoctors()
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { atoken } });
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { atoken } })
      if (data.success) {
        toast.success(data.message)
        getAllAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const value = {
    atoken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments, setAppointments,
    getAllAppointments,
    cancelAppointment
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

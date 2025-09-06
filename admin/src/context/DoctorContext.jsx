import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dtoken, setDToken] = useState(localStorage.getItem("dtoken") || "");
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/doctor/appointments",
                {
                    headers: { Authorization: `Bearer ${dtoken}` },
                }
            );

            if (data.success) {
                // const reversed = [...data.appointments].reverse();
                setAppointments(data.appointments);
                // console.log(reversed);
            } else {
                toast.error(data.message || "Failed to fetch appointments");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        }
    };

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/doctor/complete-appointment",
                { appointmentId },
                { headers: { Authorization: `Bearer ${dtoken}` } }
            );

            if (data.success) {
                toast.success(data.message);
                await getAppointments();
            } else {
                toast.error(data.message || "Failed to mark complete");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/doctor/cancel-appointment",
                { appointmentId },
                { headers: { Authorization: `Bearer ${dtoken}` } }
            );

            if (data.success) {
                toast.success(data.message);
                await getAppointments();
            } else {
                toast.error(data.message || "Failed to cancel");
            }
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || error.message || "Something went wrong");
        }
    };

    const value = {
        backendUrl,
        dtoken,
        setDToken,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;

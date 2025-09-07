import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {

  const { dashData, getDashData, dtoken, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currecny, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dtoken) {
      getDashData()
    }
  }, [dtoken])

  return dashData && (
    <div className="m-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-12 h-12" src={assets.earning_icon} alt="Doctors" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{currecny} {dashData.earning}</p>
            <p className="text-gray-500">Earning</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-12 h-12" src={assets.appointment_icon} alt="Appointments" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.appointments}</p>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-12 h-12" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.patients}</p>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white'>

        <div className=' mt-10 flex items-center gap-2.5 px-4 py-4 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Appointments</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-200' key={index}>
                <img className='rounded-full w-10' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled ? <p className='text-red-500 border text-xs font-medium px-2 py-2 rounded text-center'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 border text-xs font-medium px-2 py-2 rounded text-center'>Completed</p> :
                    <div className='flex'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer ' src={assets.cancel_icon} alt="" />
                      <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer ' src={assets.tick_icon} alt="" />
                    </div>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard

import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {

  const { appointments, getAllAppointments, atoken, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currecny } = useContext(AppContext)



  useEffect(() => {
    if (atoken) {
      getAllAppointments()
    }
  }, [atoken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white rounded text-sm border max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date and Time</p>
          <p>Doctor Name</p>
          <p>Fee</p>
          <p>Actions</p>
        </div>
        {
          appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100 trasntion-all duration-200' key={index}>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{item.userData.dob !== 'Not Selected' ? calculateAge(item.userData.dob) : '-'} </p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
              </div>
              <p>{currecny} {item.amount}</p>
              {
                item.cancelled ? <p className='text-xs font-medium text-red-400'>Cancelled</p> :
                  <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} className='cursor-pointer w-8' alt="" />
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllAppointments

import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { getDashData, dashData, atoken, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (atoken) {
      getDashData()
    }
  }, [atoken])


  return dashData && (
    <div className="m-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-12 h-12" src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">{dashData.doctors}</p>
            <p className="text-gray-500">Doctors</p>
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
                <img className='rounded-full w-10' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled ? <p className='text-xs font-medium text-red-400'>Cancelled</p> :
                    item.isCompleted ? <p className='text-xs font-medium text-green-500'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} className='cursor-pointer w-8' alt="" />
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard

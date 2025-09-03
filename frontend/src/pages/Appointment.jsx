import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInformation = doctors.find(doc => doc._id === docId)
    setDocInfo(docInformation)

  }

  const getAvailableSlot = async () => {
    if (!docInfo) return;
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currDate = new Date(today)
      currDate.setDate(today.getDate() + i);

      let endTime = new Date()
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10);
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currDate.getDate()
        let month = currDate.getMonth() + 1
        let year = currDate.getFullYear()

        const slotDate = `${day}_${month}_${year}`
        const slotTime = formattedTime;

        const bookedSlots = docInfo.slots_booked?.[slotDate] || [];
        const isSlotAvailable = !bookedSlots.includes(slotTime);


        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currDate),
            time: formattedTime
          })
        }


        currDate.setMinutes(currDate.getMinutes() + 30);
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment.');
      return navigate('/login')
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear();

      const slotDate = `${day}_${month}_${year}`;

      if (!slotTime) {
        return toast.warn("Please select a time slot before booking.");
      }
      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [docId, doctors])

  useEffect(() => {
    getAvailableSlot()
  }, [docInfo])

  return docInfo && (
    <div>

      <div className='flex flex-col sm:flex-row gap-4'>

        <div>
          <img className='bg-gray-500 w-full max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border rounded-full text-xs'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex items-center text-sm font-medium gap-1 text-gray-900 mt-3'>
              About
              <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment Fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>

      </div>


      {/* booking slot */}

      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Book your slot</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-gray-500 text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 overflow-x-scroll w-full mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'text-white bg-gray-500' : 'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>
            ))
          }
        </div>
        <button onClick={bookAppointment} className='bg-gray-500 text-white text-sm font-light px-14 py-3 rounded-full cursor-pointer my-6 hover:scale-105 transition-all duration-500'>Book an Appointment</button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

    </div>
  )
}

export default Appointment

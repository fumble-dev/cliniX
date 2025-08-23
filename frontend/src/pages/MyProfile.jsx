import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData, setUserData] = useState({
    name: 'Udanth Reddy',
    email: 'udanth@gmail.com',
    image: assets.profile_pic,
    phone: '+91 7386313880',
    address: {
      line1: "Hyderbad",
      line2: "India"
    },
    gender: 'Male',
    dob: '2005-04-22'
  })

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt="" />
      {
        isEdit ?
          <input className='bg-gray-200 text-3xl font-medium max-w-60 mt-4' value={userData.name} onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} type='text' placeholder='Enter your name' /> :
          <p className='font-medium text-3xl mt-4 text-neutral-800'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 border-none h-[1px]' />
      <div>
        <p className='text-neutral-500 underline mt-3'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            isEdit ?
              <input className='bg-gray-200 max-w-52' value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} type='text' placeholder='Enter your Phone Number' /> :
              <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            isEdit ?
              <p>
                <input className='bg-gray-200' value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { line1: e.target.value } }))} type="text" />
                <br />
                <input className='bg-gray-200' value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { line2: e.target.value } }))} type="text" />
              </p> :
              <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>Basic Information:</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit ?
              <select className='max-w-20 bg-gray-200' value={userData.gender} onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :
              <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Birthday:</p>
          {
            isEdit ?
              <input className='bg-gray-200' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} type='date' /> :
              <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10  '>
        {
          isEdit ?
            <button className='bg-black border text-white text-sm py-2 px-8 rounded-full cursor-pointer hover:bg-white hover:text-black transition-all duration-400' onClick={() => setIsEdit(false)}>Save Information</button> :
            <button className='bg-black border text-white text-sm py-2 px-8 rounded-full cursor-pointer hover:bg-white hover:text-black transition-all duration-400' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile

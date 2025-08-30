import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, atoken, getAllDoctors } = useContext(AdminContext)

  useEffect(() => {
    if (atoken) {
      getAllDoctors()
    }

  }, [atoken])

  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {
          doctors.map((item,index)=>(
            <div key={index}>
              <img src={item.image} alt="" />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList

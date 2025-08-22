import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>About <span className='text-gray-700 font-medium'>Us</span></p>
      </div>
      <div className='my-10 flex flex-col sm:flex-row gap-12'>
        <img className='w-full sm:max-w-[300px] md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>
            We are a healthcare platform committed to making quality medical services accessible and convenient for everyone. Our mission is to connect patients with experienced doctors across various specialities, ensuring timely consultations and trusted care.
          </p>
          <p>
            With a focus on innovation and patient satisfaction, we bring technology and healthcare together. From online appointment booking to easy access to specialists, we strive to make the healthcare journey smoother, faster, and more reliable.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            To revolutionize healthcare delivery by creating a patient-first ecosystem that is accessible, affordable, and driven by trust. We envision a world where every individual receives the right medical care at the right time with ease and transparency.
          </p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>Why <span className='text-gray-700 font-semibold'>Choose Us</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16  flex-col gap-5 text-[15px] hover:bg-gray-500 hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'>
          <b>Efficiency</b>
          <p>Stramlined and appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-gray-500 hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'>
          <b>Convinience</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex-col gap-5 text-[15px] hover:bg-gray-500 hover:text-white transition-all duration-500 text-gray-600 cursor-pointer'>
          <b>Personalization</b>
          <p>Tailored recommendations and reminders to help you on top of your health.</p>
        </div>
      </div>
    </div>
  )
}

export default About

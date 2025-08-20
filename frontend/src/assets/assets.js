import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Rajesh Kumar',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Rajesh Kumar is dedicated to providing holistic medical care with a focus on preventive healthcare, timely diagnosis, and effective treatment plans for patients across all age groups.',
        fees: 500,
        address: {
            line1: '17th Cross, Indiranagar',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Priya Sharma',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (Obstetrics & Gynaecology)',
        experience: '6 Years',
        about: 'Dr. Priya Sharma specializes in women’s health, offering expert care in pregnancy, fertility, and reproductive health with a compassionate approach.',
        fees: 700,
        address: {
            line1: '27th Cross, Anna Nagar',
            line2: 'Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sneha Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '4 Years',
        about: 'Dr. Sneha Patel provides expert treatment for skin, hair, and nail disorders, and emphasizes preventive skincare and cosmetic dermatology.',
        fees: 400,
        address: {
            line1: '37th Cross, Satellite Road',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Arjun Mehta',
        image: doc4,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '5 Years',
        about: 'Dr. Arjun Mehta focuses on child healthcare, growth monitoring, immunizations, and developmental care for infants and young children.',
        fees: 450,
        address: {
            line1: '47th Cross, Banjara Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Neha Gupta',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '9 Years',
        about: 'Dr. Neha Gupta specializes in treating neurological disorders such as migraines, epilepsy, stroke, and neurodegenerative diseases with a patient-centric approach.',
        fees: 800,
        address: {
            line1: '57th Cross, Connaught Place',
            line2: 'New Delhi'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Anil Reddy',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '10 Years',
        about: 'Dr. Anil Reddy offers expert diagnosis and treatment for brain, spine, and nervous system disorders with a focus on long-term patient care.',
        fees: 900,
        address: {
            line1: '12th Main, Jubilee Hills',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Manish Verma',
        image: doc7,
        speciality: 'General Physician',
        degree: 'MBBS, MD',
        experience: '12 Years',
        about: 'Dr. Manish Verma provides comprehensive medical care for adults and elderly patients, emphasizing preventive medicine and lifestyle management.',
        fees: 600,
        address: {
            line1: '17th Cross, Salt Lake',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Kavita Iyer',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (Obstetrics & Gynaecology)',
        experience: '7 Years',
        about: 'Dr. Kavita Iyer specializes in gynecological surgeries, high-risk pregnancies, and women’s reproductive health with a compassionate touch.',
        fees: 750,
        address: {
            line1: '9th Block, Koramangala',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Aditi Singh',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '3 Years',
        about: 'Dr. Aditi Singh offers advanced dermatology treatments for acne, allergies, pigmentation, and cosmetic procedures with modern techniques.',
        fees: 500,
        address: {
            line1: '37th Cross, Civil Lines',
            line2: 'Lucknow, Uttar Pradesh'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Rohit Nair',
        image: doc10,
        speciality: 'Pediatrician',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '6 Years',
        about: 'Dr. Rohit Nair is dedicated to child healthcare, providing expert care for newborns, immunizations, and chronic childhood illnesses.',
        fees: 550,
        address: {
            line1: '47th Cross, Vyttila',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Meera Joshi',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '8 Years',
        about: 'Dr. Meera Joshi treats complex neurological disorders and has expertise in stroke management, epilepsy care, and neuro-rehabilitation.',
        fees: 850,
        address: {
            line1: '57th Cross, Shivajinagar',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Suresh Chandra',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '11 Years',
        about: 'Dr. Suresh Chandra provides advanced neurological care and research-based treatments for brain and spinal disorders.',
        fees: 950,
        address: {
            line1: 'Sector 18, Noida',
            line2: 'Uttar Pradesh'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Ananya Mukherjee',
        image: doc13,
        speciality: 'General Physician',
        degree: 'MBBS, MD',
        experience: '9 Years',
        about: 'Dr. Ananya Mukherjee specializes in lifestyle diseases, preventive healthcare, and routine checkups with a patient-friendly approach.',
        fees: 550,
        address: {
            line1: '17th Cross, Park Street',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Rohan Desai',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (Obstetrics & Gynaecology)',
        experience: '5 Years',
        about: 'Dr. Rohan Desai offers expertise in infertility treatment, maternity care, and gynecological surgeries.',
        fees: 700,
        address: {
            line1: '27th Cross, Ellis Bridge',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Pooja Nair',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '6 Years',
        about: 'Dr. Pooja Nair provides expert solutions for skincare, cosmetic dermatology, and advanced dermatological procedures.',
        fees: 600,
        address: {
            line1: '37th Cross, Marine Drive',
            line2: 'Mumbai, Maharashtra'
        }
    },
]

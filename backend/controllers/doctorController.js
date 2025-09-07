import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const JWT_SECRET = process.env.JWT_SECRET || 'iloveyou'

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.json({
        success: false,
        message: "Doctor not found."
      });
    }

    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

    res.json({
      success: true,
      message: 'Availability changed.'
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message
    });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password', '-email']);
    res.json({
      success: true,
      doctors
    })
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message
    });
  }
}

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials."
      });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials."
      });
    }

    const token = jwt.sign(
      { id: doctor._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.docId;

    if (!docId) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID missing in request."
      });
    }

    const appointments = await appointmentModel.find({ docId });

    return res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { docId } = req;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    if (String(appointmentData.docId) !== String(docId)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action.",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });

    return res.status(200).json({
      success: true,
      message: "Appointment marked as completed.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const { docId } = req;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found.",
      });
    }

    if (String(appointmentData.docId) !== String(docId)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized action.",
      });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    return res.status(200).json({
      success: true,
      message: "Appointment Cancelled.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const doctorDashboard = async (req, res) => {
  try {

    const { docId } = req;
    const appointments = await appointmentModel.find({ docId });

    let earning = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount;
      }
    })

    let patients = [];
    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    })

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }

    res.json({
      success: true,
      dashData
    })

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
}


export { changeAvailablity, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard };

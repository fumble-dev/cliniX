import doctorModel from "../models/doctorModel.js";

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

export { changeAvailablity };

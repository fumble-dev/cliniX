import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'iloveyou'

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Login again."
            });
        }

        const token_decode = jwt.verify(atoken, JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(403).json({
                success: false,
                message: "Forbidden. Admin access only."
            });
        }

        next();

    } catch (error) {
        console.error(error)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
}

export default authAdmin
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'iloveyou'

const authDoctor = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Login again."
            });
        }

        const token = authHeader.split(' ')[1];
        const token_decode = jwt.verify(token, JWT_SECRET);

        req.docId = token_decode.id;

        next();
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
}

export default authDoctor;

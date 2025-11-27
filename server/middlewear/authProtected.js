import { jwtVerify } from 'jose';
import JWT_SECRET from '../utils/getJwtSecret.js';
import User from '../schemas/userSchema.js';

const authProtected = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken) {
            res.status(404);
            throw new Error('Nepoadřilo se najít autorizační token');
        }

        const onlyToken = bearerToken.split(' ')[1];
        //console.log(onlyToken);

        //To co de payloadu vložim pokud se přiuhlašuji nebo registruji tak si pak zde mohu vytáhnout
        // Na základě toho si z databíze usera vytáhnu a pošlu si do objektu req.user tyto informace.
        //V endpointu s nima potom mohu pracovat
        const { payload } = await jwtVerify(onlyToken, JWT_SECRET);

        const user = await User.findById(payload.userId).select(
            '_id username email'
        );

        if (!user) {
            res.status(401);
            throw new Error('Uživatel nenalazen');
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        next(new Error('Neautorizovcanbá uzivatel'));
    }
};

export default authProtected;

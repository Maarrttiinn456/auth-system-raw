import { jwtVerify } from 'jose';
import User from '../schemas/userSchema.js';
import generateToken from '../utils/generateToken.js';
import JWT_SECRET from '../utils/getJwtSecret.js';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Vyplňte všechna povinná pole.');
    }

    // Zkontrolovat, zda už v databázi není stejný e-mail
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        res.status(409);
        throw new Error('Uživatel již existuje');
    }

    // Pokud ne, vytvořit uživatele
    const user = new User({
        username,
        email,
        password,
    });

    await user.save();

    //payload pro token
    const payload = { userId: user._id.toString() };

    // Potom vytvořit access a refresh token
    const accessToken = await generateToken(payload, '1s');
    const refersToken = await generateToken(payload, '30d');

    console.log(accessToken);

    // Refresh token poslat do HTTP-only cookie
    res.cookie('refreshToken', refersToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    // Access token vrátit v response body
    return res.status(201).json({
        accessToken,
        user: {
            id,
            username,
            email,
        },
    });
};

export const loginUser = async (req, res) => {
    //Zkontrolovat jestli mam data z frontendu
    const { email, password } = req.body || {};

    console.log('req.body:', req.body);

    if (!email || !password) {
        res.status(400);
        throw new Error('Vyplňte přihlašovací údaje');
    }

    //Podivat se do databaze jestli uz jmeno existuje
    const userExist = await User.findOne({ email });
    if (!userExist) {
        res.status(401);
        throw new Error('Uživatel v databázi neexitujte');
    }

    //Zkontrolovat zda sedí hesla
    const matchPass = await userExist.matchPassword(password);
    if (!matchPass) {
        res.status(401);
        throw new Error('Přihlašovací údaje nejsou platné');
    }

    //Pokud ano, tak vytvořit payload a a vygnerovat tokeny
    const payload = { userId: userExist._id.toString() };
    const accessToken = await generateToken(payload, '1s');
    const refreshToken = await generateToken(payload, '30d');

    //Refres token uložit do cookies
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    //access token a data poslat v response
    return res.status(200).json({
        accessToken,
        user: {
            id: userExist._id.toString(),
            username: userExist.username,
            email: userExist.email,
        },
    });
};

export const logoutUser = async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    return res.status(200).json({ message: 'Uživatel úspěšně odhlášen' });
};

export const refresh = async (req, res) => {
    //Zkontroluju zda mám refers token
    const token = req.cookies?.refreshToken;

    if (!token) {
        res.status(401);
        throw new Error('Není žádný refresh token');
    }

    //Ověřím reffreshToken a vytáhnu payload
    const { payload } = await jwtVerify(token, JWT_SECRET);

    //Dohledám uživatele
    const user = await User.findById(payload.userId);
    if (!user) {
        res.status(401);
        throw new Error('Uživatel v DB neexistuje');
    }
    //console.log(user);

    //Vtvyořím nová accesstoken
    const accessToken = await generateToken(
        { userId: user._id.toString() },
        '1s'
    );

    console.log('Fire', accessToken);

    //Pošlu v odpovědi accessToken a usera
    return res.json({
        accessToken,
        user: {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
        },
    });
};

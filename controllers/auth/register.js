const bcrypt = require('bcrypt');
const { Conflict } = require('http-errors');

const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User } = require('../../models/user');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Conflict('Email in use');
        }

        const avatarURL = gravatar.url(email); 
        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = nanoid();
        const newUser = await User.create({
            ...req.body,
            password: hashPassword,
            avatarURL,
            verificationToken,
        });

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = register;

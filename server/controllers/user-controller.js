const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator')

const User = require('../models/user');
const getApiKey = require('../lib/gen-api-key');
const { findOne } = require('../models/user');

const SALT_ROUND = 10;

exports.register_user = [
    body('username').trim().isLength({ max: 25, min: 8 }).withMessage('usernaeme should be atleast 8 charaters'),
    body('email').trim().isEmail().withMessage('Enter a valid email address'),
    body('password').trim().isLength({ max: 25, min: 8 }).withMessage('password should be atleast 8 charaters'),
    body('rpassword').trim(),
        
    async (req, res) => {
        try {
            validationResult(req.body).throw();

            if (req.body.rpassword !== req.body.password) {
                console.log('validation failed', 'from rpassword validation');
                  return res.status(400).json({message: 'Password confirmation does not match password'});
            }

            const oldUser = await User.findOne({ $or: [{email: req.body.email}, {username: req.body.username}] });
            if (oldUser) {
                const message = {};
                if (oldUser.username === req.body.username) {
                    message.username = `${req.body.username} is not available`;
                }

                if (oldUser.email === req.body.email) {
                    message.email = `You already have an account with ${req.body.email}. Sign in instead.`;
                }

                return res.status(400).json(message);
            }

            const api_key = await getApiKey();

            const hash = await bcrypt.hash(req.body.password, SALT_ROUND)
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                api_key
            });

            await user.save();

            const token = jwt.sign(
                { id: user._id },
                process.env.jwtSecret,
                { expiresIn: 3600 },
            )

            res.json({
                token, 
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    api_key
                }
            })
        } catch (error) {
            console.log(error);
            res.status(401).json(error.message);
        }
    }
];

exports.login_user = [
    body('username').trim().isEmpty().withMessage('Pleass enter username'),
    body('password').trim().isEmpty().withMessage('Pleass enter password'),
    async (req, res) => {
        try {
            const validationError = validationResult(req.body);
            //simple validation
            if (!validationError.isEmpty()) {
                return res.status(400).json(validationError.array());
            }

            const user = await User.findOne({ $or: [{email: req.body.username}, {username: req.body.username}] });
            if (!user) {
                console.log('no match user')
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch){
                console.log('no match password')
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign(
                { id: user._id },
                process.env.jwtSecret,
                { expiresIn: 3600 },
            )

            res.json({
                token, 
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    api_key: user.api_key
                }
            })
        } catch (error) {
            console.log(error);
            res.status(401).json(error.message);
        }
    }
]


exports.get_uers = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        res.json({
            id: user._id,
            email: user.email,
            username: user.username,
            api_key: user.api_key
        })
    } catch (error) {
        console.log(error);
        res.status(401).json(error.message);
        
    }
}

exports.refresh_api_key = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const api_key = await getApiKey();
        user.api_key = api_key;
        await user.save()
        res.json({
            id: user._id,
            email: user.email,
            username: user.username,
            api_key: user.api_key
        })
        // res.json({success: true});
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
        
    }
}

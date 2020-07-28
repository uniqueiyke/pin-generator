const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const getApiKey = require('../lib/gen-api-key');
const validateInput  = require('../lib/validateInput');

const SALT_ROUND = 10;



exports.register_user = async (req, res) => {
        try {

            const oldUser = await User.findOne({ $or: [{email: req.body.email}, {username: req.body.username}] });
            if (oldUser) {
                let message = {};
                if (oldUser.username === req.body.username) {
                    message.username = `${req.body.username} is not available`;
                }

                if (oldUser.email === req.body.email) {
                    message.email = `${req.body.email} is not available. Is like you already have an account with ${req.body.email}. Sign in instead.`;
                }

                return res.status(400).json({message});
            }

            const valErr = validateInput(req.body);

            if(JSON.stringify(valErr) !== '{}'){
                return res.status(400).json({message: valErr});
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

exports.login_user = [
    async (req, res) => {
        try {
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

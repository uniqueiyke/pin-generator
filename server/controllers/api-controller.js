const createCards = require('../lib/scratch-cards/create-cards');
const CardModel = require('../models/card');
const User = require('../models/user');

exports.fetch_cards = function (req, res) {
    CardModel.find({created_by: req.user.id})
    .then( cards => res.json(cards))
    .catch(err => {
        console.log(err);
        res.status(401).json(err)}
        )
}

exports.fetch_by_api = async function(req, res) {
    const queryStr = req.query;

    if(Object.keys(queryStr).length === 0){
        return res.status(401).json({message: 'No api key contained in the request'});
    }
    
    if(!queryStr.api_key){
        return res.status(401).json({message: 'Wrong query string key'});
    }

    try {
        const user = await User.findOne({api_key: queryStr.api_key});
        if(!user || Object.keys(user).length === 0){
            return res.status(401).json({message: 'You do not have an api key. Login to our site to obtain an api key.'});
        }
        const cards = await CardModel.find({created_by: user._id});
        res.json(cards);
    } catch (error) {
        console.log(error);
        res.status(401).json(error.message);
    }
}

exports.create_cards = async function (req, res) { 
    let cardDoc = [];
    const {pin_length, serial_num_prefix, serial_num_length, num_of_cards} = req.body;
    try {
        const cards = await createCards(pin_length, serial_num_length, serial_num_prefix,  num_of_cards)
        for(let card of cards){
            const newCard = new CardModel({
                card_pin: card.pin,
                card_ser_num: card.serial_num,
                created_by: req.user.id,
                max_usage: req.body.max_usage
            });
            const cNCard = await newCard.save();
            cardDoc.push(cNCard);
        }
        res.json(cardDoc);


    } catch (error) {
        res.status(401).json(error);
        console.log(error);
        
    }
}

exports.update_cards = async function (req, res) { 
    const cardIDs = req.body;
    try {
        const cards = await CardModel.find({created_by: req.user.id});
        const filterCards = cards.filter(i_card => cardIDs.includes(`${i_card._id}`) && i_card);
        for(let card of filterCards){
            card.printed = true;
            await card.save();
        }       
        res.json(cards);
    } catch (error) {
        res.status(401).json(error);
        console.log(error);        
    }
}

exports.delete_card = async function (req, res) {
    try {
        const card = await CardModel.findById(req.params.id);
        const doc = await card.remove();
        res.json({success: true});
    } catch (error) {
        res.status(404).json({success: false})
    }
}

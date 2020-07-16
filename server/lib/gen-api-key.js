// const { model } = require("mongoose");
const User = require('../models/user')

const alpha_enums = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkemnopqrstuvwxyz';

const getNumber = () => {
    const num = Math.floor(Math.random() * Math.pow(10, 2));
    if(num > 61) return 99 - num;
    return num;
}

const generateApiKey = async () => {
    let apiKey = ''
    while (apiKey.length < 15) {
        apiKey += alpha_enums[getNumber()];
    }

    return apiKey;
}

const notDuplicateKey = async (apiKeys) => {
    const newApiKey = await generateApiKey();
    const retVal = apiKeys.find(v => v.api_key === newApiKey)
    if (!retVal) {
        return newApiKey;
    }
    await notDuplicateKey(apiKeys);
}

async function getApikey () {
    try {
        const apiKeys = await User.find({},{_id: false, api_key: true});
        return await notDuplicateKey(apiKeys)
    } catch (error) {
        console.log(error)
    }
}

module.exports = getApikey;

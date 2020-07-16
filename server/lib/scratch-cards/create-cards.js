const SerialNumber = require('./card-serial-number');
const generatePin = require('./pin-generator');

/**
 * A generator function for generating scratch card pin and serial number
 * @param {number} cardNumberOfDigits 
 * @param {string} prefixCharacters 
 * @param {number} serialNumberOfDigits 
 * @param {number} numberOfCards 
 */
function *generateCards(pinNumberOfDigits, numOfserialNumberDigits, prefixCharacters, numberOfCards) {
    const SerialNum = new SerialNumber(numOfserialNumberDigits, prefixCharacters)
    let counter = 0;
    while (counter++ < numberOfCards) {
        yield {pin: generatePin(pinNumberOfDigits), serial_num: SerialNum.serialNumber()};
    }
}

/**
 * create and save scratch card pins and serial numbers;
 * 
 * prefixCharacters is used for specifying the string part opf the serial number
 * @param {number} cardNumberOfDigits Number of digits for card
 * @param {string} prefixCharacters sspecify the string prefix of the serial number if required
 * @param {number} numOfserialNumberDigits string length for serial number
 * @param {number} numberOfCards Number of cards to be created 
 */
function createCards(pinNumberOfDigits, numOfserialNumberDigits, prefixCharacters, numberOfCards) { 
    return new Promise((resolve, reject) => {
        const cards = generateCards(pinNumberOfDigits, numOfserialNumberDigits, prefixCharacters, numberOfCards);
        let card;
        let cardArray = [];
        do{
            card = cards.next();
            if(card.value !== undefined)
                cardArray.push(card.value);
        }
        while (card.done === false);
        if(cardArray === null || cardArray.length === undefined || cardArray.length < 1){
            reject('No card created');
        }
        resolve(cardArray);
    })
}

module.exports = createCards; 

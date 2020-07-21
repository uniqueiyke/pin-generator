class SerialNumber{

    /**
     * Generate serial numbers
     * @param {string} prefixCharacters 
     * @param {number} numOfDigits 
     */
    constructor(numOfDigits, prefixCharacters = ''){
        if(numOfDigits < prefixCharacters.toString().length){
            throw Error(`prefixCharacters(${prefixCharacters}) length is greater than the required number (${numOfDigits}) of serial number digits`)
        }
        this.prefixCharacters = prefixCharacters.toUpperCase() || this.generatePrefix();
        this.digitDivisions = this.breakDigits(numOfDigits);
        this.numOfDigits = this.digitDivisions[0] - 4 - this.prefixCharacters.length;
        this.lastNumber = this.randomNumber();
        this.somePath1 = this.generatePrefix(this.digitDivisions[1] || null);
        this.somePath2 = this.generatePrefix(this.digitDivisions[2] || null);
        this.somePath3 = this.generatePrefix(this.digitDivisions[3] || null);
    }

    randomNumNot0() {
        let rand = Math.random()
        if(rand !== 0)
            return rand;
        randomNumNot0();
    }

    breakDigits (numOfDigits) {
        if(numOfDigits > 17 && numOfDigits <= 30) {
            const part1 = Math.floor(numOfDigits / 2);
            const part2 = numOfDigits - part1;
            return [part1, part2];
        }
        else if(numOfDigits > 30 && numOfDigits <= 45) {
            const part1 = Math.floor(numOfDigits / 3);
            const part2 = Math.floor((numOfDigits - part1) / 2);
            const part3 = numOfDigits - (part1 + part2);
            return [part1, part2, part3];
        }else if(numOfDigits > 45) {
            const part1 = Math.floor(numOfDigits / 4);
            const part2 = Math.floor((numOfDigits - part1) / 3);
            const part3 = Math.floor((numOfDigits - (part1 + part2)) / 2 );
            const part4 = numOfDigits - (part1 + part2 + part3);
            return [part1, part2, part3, part4];
        }
        return [numOfDigits];
    }

    randomNumber() {
        let num = `${Math.floor(this.randomNumNot0() * Math.pow(10, this.numOfDigits))}`;
        if(num.length < this.numOfDigits){
            num = num.padEnd(this.numOfDigits, Math.floor(Math.random() * 10));
        }
        return Number(num.padEnd(this.numOfDigits + 4, '0'));
    }



    generatePrefix(numOfDigits) {
        if(!numOfDigits) return ''
        return `${Math.floor(Math.pow(10, numOfDigits) * this.randomNumNot0())}`;
    }
    /**
     * return a serial number
     * @return number
     */
    serialNumber(){
        return `${this.prefixCharacters}${this.somePath1}${this.somePath2}${this.somePath3}${this.lastNumber++}`;
    }
}

module.exports = SerialNumber;

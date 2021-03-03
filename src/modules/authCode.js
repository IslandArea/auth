const Buffer = require('../lib/BufferJS');

/**
 * @constant safetyChar
 * @type {Array}
 */
const safetyChar = [
    'a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H',
    'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P',
    'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

/**
 * @method createSafetyCode
 */
const createSafetyCode = () => {
    let safety = [];
    let nm = 0;
    for (let i = 0; i < 5; i++) {
        let tableRngNm = Math.floor(Math.random() * safetyChar.length);
        safety.push(safetyChar[tableRngNm]);
        nm++;
    }

    while (nm < 5) {
        require('deasync').sleep(100);
    }

    return safety.join('');
}

/**
 * @module authCode
 */
module.exports = class authCode {
    /**
     * @method createCode
     * @returns {string}
     * 
     * @description Creates simply 1 step code based on date
     */
    createCode() {
        let date = String(Math.round(new Date().getTime() / 1000));
        let ecDate = new Buffer(date).encodeSimplify();

        return `${ecDate}`;
    }

    /**
     * @method createCode
     * @returns {string}
     * 
     * @description Creates 2 step code based on date and random letters and numbers
     */
    create2StepCode() {
        let date = String(Math.round(new Date().getTime() / 1000));

        let ecDate = new Buffer(date).encodeSimplify();
        let ecSafety = new Buffer(createSafetyCode()).encodeSimplify();

        return `${ecDate}.${ecSafety}`;
    }

    /**
     * @method createCode
     * @param {number} ID - ID of something
     * @returns {string}
     * 
     * @description Creates 3 step code based on date, random letters and numbers and provided ID
     */
    create3StepCode(ID = 1) {
        let date = String(Math.round(new Date().getTime() / 1000));

        let ecDate = new Buffer(date).encodeSimplify();
        let ecSafety = new Buffer(createSafetyCode()).encodeSimplify();
        let ecID = new Buffer(String(ID)).encodeSimplify();

        return `${ecDate}.${ecID}.${ecSafety}`;
    }
}
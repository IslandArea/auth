const Buffer = require('../lib/BufferJS');

const safetyCharters = [
    'a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H',
    'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P',
    'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

const createSafetyCode = () => {
    let safety = [];
    let nm = 0;
    for (let i = 0; i < 5; i++) {
        let tableRngNm = Math.floor(Math.random() * safetyCharters.length);
        safety.push(safetyCharters[tableRngNm]);
        nm++;
    }

    while (nm < 5) {
        require('deasync').sleep(100);
    }

    return safety.join('');
}

module.exports = class authCode {
    createCode() {
        let date = String(Math.round(new Date().getTime() / 1000));
        let ecDate = new Buffer(date).encodeSimplify();

        return `${ecDate}`;
    }
    create2StepCode() {
        let date = String(Math.round(new Date().getTime() / 1000));

        let ecDate = new Buffer(date).encodeSimplify();
        let ecSafety = new Buffer(createSafetyCode()).encodeSimplify();

        return `${ecDate}.${ecSafety}`;
    }

    create3StepCode(ID = 1) {
        let date = String(Math.round(new Date().getTime() / 1000));

        let ecDate = new Buffer(date).encodeSimplify();
        let ecSafety = new Buffer(createSafetyCode()).encodeSimplify();
        let ecID = new Buffer(String(ID)).encodeSimplify();

        return `${ecDate}.${ecID}.${ecSafety}`;
    }
}
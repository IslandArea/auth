module.exports = class BufferJS {
    constructor(string = 'Provide String') {
        this.encode = () => {
            try {
                return Buffer.from(string).toString('base64');
            } catch (e) {
                throw new Error('Something went wrong!\nProvided string to encode is not a string!\n\n' + e);
            }
        };
        this.decode = () => {
            try {
                return Buffer.from(string, 'base64').toString('ascii');
            } catch (e) {
                throw new Error('Something went wrong!\nProvided string to encode is not a string or not in base64 format!\n\n' + e);
            }
        }

        this.encodeSimplify = () => {
            try {
                return Buffer.from(string).toString('base64').slice(0, -2);
            } catch (e) {
                throw new Error('Something went wrong!\nProvided string to encode is not a string!\n\n' + e);
            }
        }
    }
}
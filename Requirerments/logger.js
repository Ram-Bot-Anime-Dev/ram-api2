const { Utils } = require("discord-helper.js");

class Logs extends Utils {
    constructor() {
        super("ram-api2");


    }
    info(text) {
        this.logs.info(text);
    }
    warn(text) {
        this.logs.warn(text);
    }
    error(text) {
        this.logs.error(text)
    }
}

module.exports = Logs;
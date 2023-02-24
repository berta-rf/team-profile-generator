const Employee = require("./Employee");

// Manager class inherits from Employee class
class Manager extends Employee {
    constructor(officeNumber) {
        this.officeNumber = officeNumber;
    }
    getRole() {//return Manager

    }
}


module.exports = Manager;
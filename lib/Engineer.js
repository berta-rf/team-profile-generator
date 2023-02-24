const Employee = require("./Employee");

// Engineer class inherits from Employee class
class Engineer extends Employee {
    constructor(github) {
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {//return Engineer
        
    }
}

module.exports = Engineer;
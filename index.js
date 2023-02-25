import Manager from "./lib/Manager.js";
import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";

import inquirer from 'inquirer';
import * as fs from 'fs';
import path from 'path';
import emailValidator from 'email-validator';

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

import { render } from "./src/page-template.js";

const team = [];
// array of questions to gather team member's info
const teamForm = {
        
    manager: [
        {
            type: 'input',
            name: 'name',
            message: "Enter the Team Manager's name",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the Team Manager's ID",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the Team Manager's email address",
            validate: (input) => {
            // if it returns true it's valid input, otherwise it prompts user to enter valid email
            return emailValidator.validate(input) ? true : 'Enter a valid email address';
            }    
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter Office number',
        },
    ],

    nextEmployee: [
        {
            type: 'list',
            name: 'role',
            message: 'Add another team member',
            choices: ['Engineer', 'Intern', "I don't want to add any more team members"],
        },
    ],

    engineer: [
        {
            type: 'input',
            name: 'name',
            message: "Enter the Engineer's name",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the Engineer's ID",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the Engineer's email address",
            validate: (input) => {
            // if it returns true it's valid input, otherwise it prompts user to enter valid email
            return emailValidator.validate(input) ? true : 'Enter a valid email address';
            }    
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter the Engineer's GitHub username",
        },
    ],

    intern: [
        {
            type: 'input',
            name: 'name',
            message: "Enter the Intern's name",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the Intern's ID",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter the Intern's email address",
            validate: (input) => {
            // if it returns true it's valid input, otherwise it prompts user to enter valid email
            return emailValidator.validate(input) ? true : 'Enter a valid email address';
            }    
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter the Intern's School",
        },
    ],
};

function promptUser() {

        inquirer
        .prompt(teamForm.manager)
        .then(res => {
            // populate manager info
            team.push(new Manager(res.name, res.id, res.email, res.officeNumber));
            promptForNextEmployee();
        })

        const promptForNextEmployee = () => {
            inquirer
            .prompt(teamForm.nextEmployee)
            .then(res => {
                console.log(res)
                if (res.role === "Engineer") {
                    promptForEngineer();
                } else if (res.role === "Intern") {
                    promptForIntern();
                } else {
                    console.log(team);
                    render(team);
                }
                
            })
        }

        const promptForEngineer = () => {
            inquirer
            .prompt(teamForm.engineer)
            .then(res => {
                // add new engineer to team array
                team.push(new Engineer(res.name, res.id, res.email, res.github));
                promptForNextEmployee();
            })
        }

        const promptForIntern = () => {
            inquirer
            .prompt(teamForm.intern)
            .then(res => {
                // add new intern to team array
                team.push(new Intern(res.name, res.id, res.email, res.school));
                promptForNextEmployee();
            })
        }

}

promptUser();


// function createTeam() {

//     promptUser()

//      fs.writeFile(generateTeam(team))???

// }


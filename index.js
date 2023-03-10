import Manager from "./lib/Manager.js";
import Engineer from "./lib/Engineer.js";
import Intern from "./lib/Intern.js";

import inquirer from 'inquirer';
import * as fs from 'fs';
import path from 'path';
import emailValidator from 'email-validator';

const outputPath = "./output/team.html";

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
            // populate manager info and add to team array
            team.push(new Manager(res.name, res.id, res.email, res.officeNumber));
            promptForNextEmployee();
        })

        const promptForNextEmployee = () => {
            inquirer
            .prompt(teamForm.nextEmployee)
            .then(res => {
                if (res.role === "Engineer") {
                    promptForEngineer();
                } else if (res.role === "Intern") {
                    promptForIntern();
                } else {
                    // calls function to generate html with team input and write on team.html
                    createTeam(team);
                }
                
            })
        }

        const promptForEngineer = () => {
            inquirer
            .prompt(teamForm.engineer) // prompts engineer questions
            .then(res => {
            // populate engineer info and add to team array
                team.push(new Engineer(res.name, res.id, res.email, res.github));
                promptForNextEmployee();
            })
        }

        const promptForIntern = () => {
            inquirer
            .prompt(teamForm.intern) // prompts intern questions
            .then(res => {
            // populate intern info and add to team array
                team.push(new Intern(res.name, res.id, res.email, res.school));
                promptForNextEmployee();
            })
        }

}

promptUser();

// Function to render hmtl in team.html file
function createTeam(team) {
  
    fs.writeFile(outputPath, render(team), (err) => {
        if (err) {
        console.log(err);
        } else {
        console.log("File written successfully");
        }
    });

}


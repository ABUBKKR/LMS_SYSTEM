#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


// Initialize Chalk Animation
const rainbowAnimation = chalkAnimation.rainbow("Student Management System");

// Utility function to display messages with chalk styling
const showMessage = (message: string, color: string = "white") => {
  console.log(chalk.blue(message));
};

// Student data array
const students: { name: string; age: number; grade: number; studentsubjects: string ;Totalmarks:number;Obtainedmarks:number}[] = [];

// Function to display the main menu
const showMainMenu = async () => {
  showMessage("--- Main Menu ---", "cyan");
  const { option } = await inquirer.prompt([
    {
      name: "option",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add Student", "View Students", "Exit"],
    },
  ]);
  return option;
};

// Function to add a student
const addStudent = async () => {
  showMessage("--- Add Student ---", "green");
  const { name, age, grade,  studentsubjects,Totalmarks,Obtainedmarks} = await inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "Enter student name:",
    },
    {
      name: "age",
      type: "number",
      message: "Enter student age:",
    },
    {
      name: "grade",
      type: "number",
      message: "Enter student grade:",
    },
    {
      name: "studentsubjects",
      type: "string",
      message: "Enter student subjects:",
    },{
      name: "Totalmarks",
      type: "number",
      message: "Enter Totalmarks of subject:",
    },{
      name: "Obtainedmarks",
      type: "number",
      message: "Enter Obtainedmarks of student:",
    },
  ]);
  students.push({ name, age, grade,  studentsubjects,Totalmarks,Obtainedmarks });
  showMessage(`Added student: ${name} (Age: ${age}, Grade: ${grade}, subject: ${studentsubjects} ,Totalmarks:${Totalmarks}, Obtainedmarks:${Obtainedmarks})`, "green");
};

// Function to view all students
const viewStudents = () => {
  showMessage("--- View Students ---", "yellow");
  if (students.length === 0) {
    showMessage(chalk.red("No students found!"), "yellow");
  } else {
    console.table(students);
  }
};

// Function to prompt the user if they want to repeat the program
const askRepeat = async () => {
  const { repeat } = await inquirer.prompt([
    {
      name: "repeat",
      type: "confirm",
      message: "Do you want to run the program again?",
    },
  ]);
  return repeat;
};

// Function to start the student management system
const startStudentManagement = async () => {
  rainbowAnimation.start(); // Start the rainbow animation
  let shouldExit = false;
  while (!shouldExit) {
    const option = await showMainMenu();
    switch (option) {
      case "Add Student":
        await addStudent();
        break;
      case "View Students":
        viewStudents();
        break;
      case "Exit":
        shouldExit = true;
        break;
      default:
        showMessage("Invalid option!", "red");
        break;
    }

    if (!shouldExit) {
      const repeat = await askRepeat();
      if (!repeat) {
        shouldExit = true;
      }
    }
  }
  rainbowAnimation.stop(); // Stop the rainbow animation
  showMessage("Exiting the program. Goodbye!", "magenta");
};


// Start the student management system
startStudentManagement()


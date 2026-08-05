// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');

let students = [];

function getAverage(scores) {
    if (scores.length === 0) return 0;
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return sum / scores.length;
}

function addStudent() {
    const name = readlineSync.question('Student name: ');
    if (name.trim() === '') {
        console.log('Error: Name cannot be empty.');
        return;
    }

    const idInput = readlineSync.question('Student ID: ');
    const id = parseInt(idInput, 10);
    if (isNaN(id)) {
        console.log('Error: Invalid ID. Please enter a number.');
        return;
    }

    const scoresCountInput = readlineSync.question('How many scores? ');
    const scoresCount = parseInt(scoresCountInput, 10);
    if (isNaN(scoresCount) || scoresCount < 0) {
        console.log('Error: Invalid number of scores. Please enter a non-negative number.');
        return;
    }

    const scores = [];
    for (let i = 0; i < scoresCount; i++) {
        const scoreInput = readlineSync.question(`Enter score ${i}: `);
        const score = parseFloat(scoreInput);
        if (isNaN(score)) {
            console.log('Error: Invalid score. Aborting add student.');
            return;
        }
        scores.push(score);
    }

    const newStudent = { name: name.trim(), id, scores };
    students.push(newStudent);
    console.log(`Student "${name.trim()}" added successfully.`);
}

function displayAllStudents() {
    if (students.length === 0) {
        console.log('No students have been added yet.');
        return;
    }

    console.log('\n-----------------------------------------------------------');
    console.log('ID\t\t\tName\t\tScores\t\tAverage');
    console.log('-----------------------------------------------------------');

    for (const student of students) {
        const average = getAverage(student.scores).toFixed(2);
        const scoresStr = `[${student.scores.join(', ')}]`;
        console.log(`${student.id}\t${student.name}\t\t${scoresStr}\t\t${average}`);
        
    }
}

function calculateAverageScoreForStudent() {
    if (students.length === 0) {
        console.log('No students have been added yet.');
        return;
    }

    const idInput = readlineSync.question('Enter student ID: ');
    const id = parseInt(idInput, 10);

    if (isNaN(id)) {
        console.log('Error: Invalid ID. Please enter a number.');
        return;
    }

    const student = students.find(s => s.id === id);
    if (!student) {
        console.log(`Error: Student not found.`);
        return;
    }

    const average = getAverage(student.scores).toFixed(2);
    console.log(`${student.name}'s average score: ${average}`);
}

function mainMenu() {
    let running = true;

    while (running) {
        console.log('\n===============================');
        console.log('   STUDENT RECORD SYSTEM MENU');
        console.log('===============================');
        console.log('1. Add student');
        console.log('2. Display all students');
        console.log('3. Calculate average score');
        console.log('4. Quit');

        const choice = readlineSync.question('Enter your choice (1-4): ');

        switch (choice.trim()) {
            case '1':
                addStudent();
                break;
            case '2':
                displayAllStudents();
                break;
            case '3':
                calculateAverageScoreForStudent();
                break;
            case '4':
                console.log('Goodbye!');
                running = false;
                break;
            default:
                console.log('Invalid choice. Please enter a number between 1 and 4.');
                break;
        }
    }
}

mainMenu();



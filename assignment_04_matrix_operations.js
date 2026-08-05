// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, cols, name = '') {
  let matrix = [];
  const label = name ? ` for (${name})` : '';

    for (let i = 0; i < rows; i++) {
        let row;
        do {
            const input = readlineSync.question(`Enter row ${i + 1}${label}: `);
            row = input.trim().split(/\s+/).map(Number);
            if (row.length !== cols || row.some(num => Number.isNaN(num))) {
                console.log(`Error: Please enter exactly ${cols} valid numbers.`);
            }
        } while (row.length !== cols || row.some(num => Number.isNaN(num)));

        matrix.push(row);
    }
    return matrix;
}

function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].map(num => String(num).padStart(5)).join(' '));
  }
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];

  for (let j = 0; j < cols; j++) {
    let newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    transposed.push(newRow);
  }
 return transposed;
}

function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const sumMatrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(matrixA[i][j] + matrixB[i][j]);
        }
        sumMatrix.push(row);
    }
    return sumMatrix;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;
  const result = [];

    for (let i = 0; i < rowsA; i++) {
        const row = [];
        for (let j = 0; j < colsB; j++) {
            let sum = 0;
            for (let k = 0; k < colsA; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            row.push(sum);
        }
        result.push(row);
    }
    return result;
}

function main() {
    console.log("=== PART A: Transpose a Matrix ===");
    const rowsA = readlineSync.questionInt("Enter number of rows: ");
    const colsA = readlineSync.questionInt("Enter number of columns: ");

    if (rowsA <= 0 || colsA <= 0) {
        console.log('Error: Please enter positive integers for rows and columns.');
        return;
    }

    const matrixA = readMatrix(rowsA, colsA);

    console.log("Original Matrix:");
    printMatrix(matrixA);

    const transposed = transposeMatrix(matrixA);
    console.log('\nTransposed Matrix:');
    printMatrix(transposed);

    console.log("\n=== PART B: Add Two Matrices ===");
    console.log(`Entering Matrix B (must be ${rowsA} x ${colsA})`);
    const matrixB = readMatrix(rowsA, colsA, 'B');

    console.log('\nMatrix A + Matrix B:');
    const sumMatrix = addMatrices(matrixA, matrixB);
    printMatrix(sumMatrix);

    console.log("\n=== PART C: Multiply Two Matrices ===");
    console.log(`For multiplication A x C, Matrix C must have ${colsA} rows.`);
    const colsC = readlineSync.questionInt("Enter number of columns for Matrix C: ");

    if (colsC <= 0) {
        console.log('Error: Please enter a positive integer for columns.');
        return;
    }

    const matrixC = readMatrix(colsA, colsC, 'C');

    console.log('\nMatrix A x Matrix C:');
    const product = multiplyMatrices(matrixA, matrixC);
    printMatrix(product);
}

main();

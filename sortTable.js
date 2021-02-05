/*
A few requirements for configuring the table:
1. The table must have id="sortable", i.e. <table id="sortable">
2. The table needs to have a table header, and the table header must have
   onclick="sortBy(n)", where n is the column number starting with 0
   i.e. <th onclick="sortBy(0)">Title of First Column</th>
*/

var cPrev = -1; // global var saves the previous c, used to
            // determine if the same column is clicked again

function sortTable(table_id, c) {
    let rows = document.getElementById(table_id).rows.length; // num of rows
    let columns = document.getElementById(table_id).rows[0].cells.length; // num of columns
    let arrTable = [...Array(rows)].map(e => Array(columns)); // create an empty 2d array

    for (ro=0; ro<rows; ro++) { // cycle through rows
        for (co=0; co<columns; co++) { // cycle through columns
            // assign the value in each row-column to a 2d array by row-column
            arrTable[ro][co] = document.getElementById(table_id).rows[ro].cells[co].innerHTML;
        }
    }

    let th = arrTable.shift(); // remove the header row from the array, and save it
    console.log(arrTable)
    
    if (c !== cPrev) { // different column is clicked, so sort by the new column
        if(c == 0 || c == 2 || c == 3 || c == 8 || c == 12 || c == 13 || c == 14) {
            arrTable.sort((a, b) => a - b);
        } else {
            arrTable.sort(
                function (a, b) {
                    if (a[c] === b[c]) {
                        return 0;
                    } else {
                        return (a[c] < b[c]) ? -1 : 1;
                    }
                }
            );
        }
        
    } else { // if the same column is clicked then reverse the array
        arrTable.reverse();
    }
    console.log(arrTable)
    cPrev = c; // save in previous c

    arrTable.unshift(th); // put the header back in to the array

    // cycle through rows-columns placing values from the array back into the html table
    for (ro=0; ro<rows; ro++) {
        for (co=0; co<columns; co++) {
            document.getElementById(table_id).rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
}
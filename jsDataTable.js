// function sortTable(table_id, sortColumn){
//     var tableData = document.getElementById(table_id).getElementsByTagName('tbody').item(0);
//     var rowData = tableData.getElementsByTagName('tr');            
//     for(var i = 0; i < rowData.length - 1; i++){
//         for(var j = 0; j < rowData.length - (i + 1); j++){
//             if(Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) < Number(rowData.item(j+1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))){
//                 tableData.insertBefore(rowData.item(j+1),rowData.item(j));
//             }
//         }
//     }
// }

/*
A few requirements for configuring the table:
1. The table must have id="sortable", i.e. <table id="sortable">
2. The table needs to have a table header, and the table header must have
   onclick="sortBy(n)", where n is the column number starting with 0
   i.e. <th onclick="sortBy(0)">Title of First Column</th>
*/

cPrev = -1; // global var saves the previous c, used to
            // determine if the same column is clicked again

function sortTable(table_id, c) {
    rows = document.getElementById(table_id).rows.length; // num of rows
    columns = document.getElementById(table_id).rows[0].cells.length; // num of columns
    arrTable = [...Array(rows)].map(e => Array(columns)); // create an empty 2d array

    for (ro=0; ro<rows; ro++) { // cycle through rows
        for (co=0; co<columns; co++) { // cycle through columns
            // assign the value in each row-column to a 2d array by row-column
            arrTable[ro][co] = document.getElementById(table_id).rows[ro].cells[co].innerHTML;
        }
    }

    th = arrTable.shift(); // remove the header row from the array, and save it
    
    if (c !== cPrev) { // different column is clicked, so sort by the new column
        arrTable.sort(
            function (a, b) {
                if (a[c] === b[c]) {
                    return 0;
                } else {
                    return (a[c] < b[c]) ? -1 : 1;
                }
            }
        );
    } else { // if the same column is clicked then reverse the array
        arrTable.reverse();
    }
    
    cPrev = c; // save in previous c

    arrTable.unshift(th); // put the header back in to the array

    // cycle through rows-columns placing values from the array back into the html table
    for (ro=0; ro<rows; ro++) {
        for (co=0; co<columns; co++) {
            document.getElementById(table_id).rows[ro].cells[co].innerHTML = arrTable[ro][co];
        }
    }
}


function createTemplate(data, rowDataType, index) {
    const tr = document.createElement('tr');
    for(let i = 0; i < data.length; i++) {
        const td = document.createElement(rowDataType);
        let tdText = data[i];
        if(rowDataType == 'th') {
            if(data[i].indexOf("_") == 0) {
                tdText = data[i].split("_").join("");
                td.setAttribute("id", `col-${tdText}`);
            } else {
                tdText = data[i].split("_").join(" ");
                td.setAttribute("id", `col-${data[i]}`);
            }
            td.setAttribute('onClick', `sortTable('jsDataTable', ${i + 1})`)
        } else if(rowDataType == 'td') {
            if(i == 0) tdText = index + 1;
        }
        td.textContent = tdText;
        tr.appendChild(td);
    }
    return tr;
}

function filterTable(event) {
    var target = event.target;
    var filter = target.value.toUpperCase();
    var rows = document.querySelector("#jsDataTable tbody").rows;

    let hasValue = [];
    for(var i = 0; i < rows.length; i++) {
        var columns = [];
        for (let j = 0; j < rows[i].cells.length; j++) {
            columns[j] = rows[i].cells[j].textContent.toUpperCase();
            if(columns[j].includes(filter)) {
                hasValue[i] = true;
            }
        }
        
        if(hasValue[i]) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }

    document.getElementById('filteredResults').textContent = hasValue.filter(item => item).length;
}



function initializeDataTable() {
    let local_data = tableData;
    let tableHead = document.createElement('thead');
    let tableBody = document.createElement('tbody');

    let keys = Object.keys(tableData[0]);
    tableHead.appendChild(createTemplate(keys, 'th', null));

    for(var i = 0; i < local_data.length; i++) {
        let row_data = local_data[i];
        let data = Object.values(row_data);
        tableBody.appendChild(createTemplate(data, 'td', i));
    }
    document.getElementById('jsDataTable').appendChild(tableHead);
    document.getElementById('jsDataTable').appendChild(tableBody);
    document.getElementById('searchFilterInput').addEventListener('keyup', filterTable, false);
}


initializeDataTable();



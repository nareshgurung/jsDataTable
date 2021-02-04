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



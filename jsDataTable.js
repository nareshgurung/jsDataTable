function createTemplate(data) {
    const template = `
        <tr>
            <td>${data.id}</td>
            <td>${data.username}</td>
            <td>${data.fullname}</td>
        </tr>
    `;
    return template;
}

function initializeDataTable() {
    var local_data = tableData;
    var row_data = '', keys = [];
    for(var k in tableData[0]) keys.push(k);

    for(var i = 0; i < local_data.length; i++) {
        row_data += createTemplate(local_data[i]);
    }

    const tableHeadTemplate = `
        <tr>
            <th>${keys[0]}</th>
            <th>${keys[1]}</th>
            <th>${keys[2]}</th>
        </tr>
    `;
    var tableHead = document.createElement('thead');
    var tableBody = document.createElement('tbody');
    tableHead.innerHTML = tableHeadTemplate;
    tableBody.innerHTML = row_data;
    document.getElementById('jsDataTable').appendChild(tableHead);
    document.getElementById('jsDataTable').appendChild(tableBody);
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
}

document.getElementById('searchFilterInput').addEventListener('keyup', filterTable, false);

initializeDataTable();
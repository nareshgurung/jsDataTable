function readTextFile(file) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', file, true);
    
    // send request
    add(xhr);

    function add(request) {
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
        request.setRequestHeader("Access-Control-Allow-Header", "Content-Type");
    }
    xhr.send();

    //process request
    xhr.onload = () => {
        if(xhr.status == 200) {
            let data = xhr.responseText;
            return data;
        }
    }
}

function createTemplate(data) {
    const template = `
        <tr>
            <td>${data.id}</td>
            <td>${data.username}</td>
            <td>${data.fullname}</td>
        </tr>
    `;
}

var tableData = readTextFile('data.txt');
var local_data = tableData;

var row_data = '';

for(var i = 0; i < local_data.length; i++) {
    row_data += createTemplate(local_data);
}

var tableBody = document.createElement('tbody');
tableBody.innerHTML = row_data;
document.getElementById('jsDataTable').appendChild(tableBody);

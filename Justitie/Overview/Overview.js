window.addEventListener("load", handleLoad);
window.addEventListener("load", handleGetAllCases);

function handleLoad(){
    window.addEventListener("load", handleGetAllCases)

    let delete_case_button = document.getElementById("button_delete_case")
    delete_case_button.addEventListener("click", handleDeleteCase)
}

function handleGetAllCases() {
    let url = 'http://localhost:3000/cases/';
    let output = document.getElementById("outputCases");
    fetch(url)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.log(response.status)
            }
        })
        .then((cases) => {
            let data = [];
            for (let case_ of cases) {
                data.push([case_.id, case_.nameLawyer, case_.nameSuspect, case_.nameAgent, case_.charge, case_.outcomeCharge, case_.time, case_.courseOfTheCase]);
            }
            let table = makeTable(data);
            output.appendChild(table);
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        });
}

function handleDeleteCase(){
    let url = 'http://localhost:3000/cases/';
    let case_id = document.getElementById("case_ID_Input").value;
    let case_ = {case_id : case_id}
    fetch(url + case_id,
        {
            method: "DELETE",
            body: JSON.stringify(case_),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw `error with status ${response.status}`;
            }
        })
        .catch((error) => {
            console.log(error)
        });
    location.reload()
}

function makeTable(matrix) {
    let table = document.createElement("table");
    table.setAttribute("id", "case_table")
    for (let i = 0; i < matrix.length; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < matrix[i].length; j++) {
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(matrix[i][j]));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    return table;
}
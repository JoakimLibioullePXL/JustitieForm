window.addEventListener("load", handleLoad);

function handleLoad(){
    let button = document.getElementById("ButtonSubmit");
    button.addEventListener("click", handlePostCase);

}

function handlePostCase(){
    let url = 'http://localhost:3000/cases/';
    let output = document.getElementById("div_output");

    let nameLawyer = document.getElementById("inputNameLawyer").value;
    let nameSuspect = document.getElementById("inputSuspectName").value;
    let nameAgent = document.getElementById("inputAgent").value;
    let charge = document.getElementById("inputCharge").value;
    let outcomeCharge = document.getElementById("inputOutcomeCharge").value;
    let time = document.getElementById("inputTime").value;
    let courseOfTheCase = document.getElementById("inputCourseOfTheCase").value;

    let cases = {nameLawyer: nameLawyer, nameSuspect: nameSuspect, nameAgent: nameAgent, charge: charge, outcomeCharge: outcomeCharge,
    time: time, courseOfTheCase: courseOfTheCase};

    fetch(url,
        {
            method: "POST",
            body: JSON.stringify(cases),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.status == 201) {
                return response.json();
            } else {
                console.log(response.status)
            }
        })
        .then((cases) => {
            let data = [];
            data.push([cases]);
            alert("Uw zaak is lokaal opgeslagen op uw computer!");
            location.reload();
        })
        .catch((error) => {
            output.appendChild(document.createTextNode(error));
        })
        .finally(() => {
            window.location.href = "../Overview/Overview.html"
        })
}
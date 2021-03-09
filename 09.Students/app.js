function students() {

    let tableBody = document.querySelector('tbody');
    let form = document.querySelector('form');
    let url = "http://localhost:3030/jsonstore/collections/students";

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let inputsEls = Array.from(form.querySelectorAll('input'));
        let data = {
            firstName: inputsEls[0].value,
            lastName: inputsEls[1].value,
            facultyNumber: inputsEls[2].value,
            grade: inputsEls[3].value
        }
        if (data.firstName === "" || data.lastName === "" || data.facultyNumber === "" || data.grade === "") {
            alert('All fields must be filled');
            return;
        }

        if (!Number(data.grade)) {
            alert('Grade should be a valid number!');
            return;
        }

        inputsEls[0].value = "";
        inputsEls[1].value = "";
        inputsEls[2].value = "";
        inputsEls[3].value = "";
        postData(data);

    })
    function getData() {
        tableBody.innerHTML = "";
        fetch(url).then(res => res.json()).then(data => {
            Object.values(data).forEach(student => {
                let row = document.createElement('tr');
                let firstName = document.createElement('th');
                let lastName = document.createElement('th');
                let facultyNumber = document.createElement('th');
                let grade = document.createElement('th');
                firstName.textContent = `${student.firstName}`;
                lastName.textContent = `${student.lastName}`;
                facultyNumber.textContent = `${student.facultyNumber}`;
                grade.textContent = `${student.grade}`;
                row.appendChild(firstName);
                row.appendChild(lastName);
                row.appendChild(facultyNumber);
                row.appendChild(grade);
                tableBody.appendChild(row);
            })
        })
    }
    getData();

    function postData(data) {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => res.json())

        getData();
    }

}

students();
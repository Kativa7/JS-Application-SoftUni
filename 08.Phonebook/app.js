function attachEvents() {
    let url = "http://localhost:3030/jsonstore/phonebook";

    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');
    let ulArea = document.getElementById('phonebook');


    loadBtn.addEventListener('click', loadData);

    function loadData() {
        ulArea.innerHTML = '';
        fetch(url).then((response) => response.json()).then((data) => {
            let result = Object.values(data)
                .forEach(entry => {

                    let liItem = document.createElement('li');
                    let delBtn = document.createElement('button');
                    delBtn.textContent = "Delete";
                    liItem.textContent = `${entry.person}: ${entry.phone}`;
                    let id = entry._id;
                    let delUrl = `http://localhost:3030/jsonstore/phonebook/${id}`


                    delBtn.addEventListener('click', (e) => {
                        fetch(delUrl, {
                            method: "DELETE"
                        });
                        e.target.parentNode.remove();
                    });

                    liItem.appendChild(delBtn);
                    ulArea.appendChild(liItem);
                })
        });
    }

    createBtn.addEventListener('click', () => {

        let personInfo = document.getElementById('person');
        let phoneInfo = document.getElementById('phone');

        fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person: personInfo.value, phone: phoneInfo.value })
        })

        loadData();
        personInfo.value = '';
        phoneInfo.value = '';

    })


}

attachEvents();
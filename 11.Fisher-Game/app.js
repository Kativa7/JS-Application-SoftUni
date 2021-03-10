//тук много се обърках и не можах да допиша логиката на edit/delete бутоните :( 

function attachEvents() {
    document.querySelector('.load').addEventListener('click', loadCatches);
    const addBtn = document.querySelector('#add');
    addBtn.addEventListener('click', addCatch);
    window.addEventListener('load', checkIfLoggedIn);
    const catchForm = document.querySelector('#catches');


    const wrapperDiv = document.querySelector('#catches');

    function checkIfLoggedIn() {
        const token = sessionStorage.getItem('userToken');
        if (token != null) {
            addBtn.disabled = false;
            document.querySelectorAll('a')[1].textContent = 'Logout';
            catchForm.addEventListener('click', (e) => {
                if (e.target.tagName == 'BUTTON' && e.target.innerText == "DELETE") {
                    deleteCatch(e);
                } else if (e.target.tagName == 'BUTTON' && e.target.innerText == "UPDATE") {
                    updateCatch(e);
                }
            })
        }
    }


    async function loadCatches() {
        wrapperDiv.innerHTML = ""
        let url = 'http://localhost:3030/data/catches';

        const response = await fetch(url);
        const data = await response.json();


        data.forEach(x => {
            const divCatch = document.createElement('div');
            divCatch.setAttribute('class', 'catch');

            const anglerLabel = document.createElement('label');
            anglerLabel.textContent = 'Angler';

            const anglerInput = document.createElement('input');
            anglerInput.setAttribute('type', 'text');
            anglerInput.setAttribute('class', 'angler');
            anglerInput.setAttribute('value', x.angler);

            const weightLabel = document.createElement('label');
            weightLabel.textContent = 'Weight';

            const weightInput = document.createElement('input');
            weightInput.setAttribute('type', 'number');
            weightInput.setAttribute('class', 'weight');
            weightInput.setAttribute('value', x.weight);

            const speciesLabel = document.createElement('label');
            speciesLabel.textContent = 'Species';

            const speciesInput = document.createElement('input');
            speciesInput.setAttribute('type', 'text');
            speciesInput.setAttribute('class', 'species');
            speciesInput.setAttribute('value', x.species);

            const locationLabel = document.createElement('label');
            locationLabel.textContent = 'Location';

            const locationInput = document.createElement('input');
            locationInput.setAttribute('type', 'text');
            locationInput.setAttribute('class', 'location');
            locationInput.setAttribute('value', x.location);

            const baitLabel = document.createElement('label');
            baitLabel.textContent = 'Bait';

            const baitInput = document.createElement('input');
            baitInput.setAttribute('type', 'text');
            baitInput.setAttribute('class', 'bait');
            baitInput.setAttribute('value', x.bait);

            const captureLabel = document.createElement('label');
            captureLabel.textContent = 'Capture Time';

            const captureInput = document.createElement('input');
            captureInput.setAttribute('type', 'number');
            captureInput.setAttribute('class', 'captureTime');
            captureInput.setAttribute('value', x.captureTime);

            let updateBtn = document.createElement('button');
            updateBtn.textContent = 'UPDATE';
            updateBtn.setAttribute('class', 'update');
            let deleteBtn = document.createElement('button');
            deleteBtn.setAttribute('class', 'delete');
            deleteBtn.setAttribute('dataId', x._id);
            deleteBtn.setAttribute('owner', x._ownerId);

            updateBtn.disabled = true;
            deleteBtn.disabled = true;

            deleteBtn.textContent = 'DELETE';

            divCatch.appendChild(anglerLabel);
            divCatch.appendChild(anglerInput);
            divCatch.appendChild(weightLabel);
            divCatch.appendChild(weightInput);
            divCatch.appendChild(speciesLabel);
            divCatch.appendChild(speciesInput);
            divCatch.appendChild(locationLabel);
            divCatch.appendChild(locationInput);
            divCatch.appendChild(baitLabel);
            divCatch.appendChild(baitInput);
            divCatch.appendChild(captureLabel);
            divCatch.appendChild(captureInput);
            divCatch.appendChild(updateBtn);
            divCatch.appendChild(deleteBtn);

            wrapperDiv.appendChild(divCatch);



        })

    }

    async function addCatch() {
        const url = 'http://localhost:3030/data/catches';
        const inputs = document.querySelectorAll('#addForm input');
        const obj = {
            angler: inputs[0].value,
            weight: inputs[1].value,
            species: inputs[2].value,
            location: inputs[3].value,
            bait: inputs[4].value,
            captureTime: inputs[5].value,
        }

        const token = sessionStorage.getItem('userToken');

        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(obj)
        });

        if (response.ok == false) {
            const error = await response.json();
            return alert(error.message);
        }
        loadCatches();
    }

    async function deleteCatch(e) {
        let token = sessionStorage.getItem('userToken');
        let userId = sessionStorage.getItem('userId');
        let ownerId = e.target.getAttribute('owner');
      

        let dataId = e.target.getAttribute('dataId');
        if (userId == ownerId) {
            let url = 'http://localhost:3030/data/catches/';
            await fetch(url + dataId, {
                method: "delete",
                headers: { "X-Authorization": token },
            });
        }

        loadCatches();
    }

    async function updateCatch(e) {
        const token = sessionStorage.getItem('userToken');
        let url = 'http://localhost:3030/data/catches/';
        let id = e.target.getAttribute('data-key');

        const inputs = document.querySelectorAll('#addForm input');
        const obj = {
            angler: inputs[0].value,
            weight: inputs[1].value,
            species: inputs[2].value,
            location: inputs[3].value,
            bait: inputs[4].value,
            captureTime: inputs[5].value,
        }

        await fetch(url + id, {
            method: "PUT",
            headers: { "X-Authorization": token, "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        });
        loadCatches();
    }




}

attachEvents();


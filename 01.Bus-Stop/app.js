function getInfo() {
    let validBuses = ['1287', '1308', '1327', '2334'];
    let busId = document.getElementById('stopId');
    let id = busId.value;
    let stopName = document.getElementById('stopName');
    let ul = document.getElementById('buses');


    const url = `http://localhost:3030/jsonstore/bus/businfo/` + id;

    if (!validBuses.includes(id)) {
        ul.innerHTML = '';
        stopName.textContent = "Error"
        return;
    }
    ul.innerHTML = '';
    fetch(url).then((response) => response.json()).then((stop) => {
        stopName.textContent = stop.name;
        Object.keys(stop.buses).forEach(key => {
            let li = document.createElement('li');
            li.textContent = `Bus ${key} arrives in ${stop.buses[key]}`;
            ul.appendChild(li);
        });
    })

    busId.value = '';

}
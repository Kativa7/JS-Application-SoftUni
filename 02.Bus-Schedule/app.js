function solve() {
    let id = 'depot'
    
    let title = document.querySelector('#info span');
    let departBtn = document.querySelector('#depart');
    let arriveBtn = document.querySelector('#arrive');
    let stopName = "";
    
    function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/` + id;
        fetch(url).then((response) => response.json()).then((stop) => {
            title.textContent = `Next stop ${stop.name}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
            stopName = stop.name;
            id = stop.next;

        });
    }

    function arrive() {
        title.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
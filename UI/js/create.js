//creates incident
function createIncident() {
    let incidentType = document.getElementById('select').value;
    let auth = localStorage.getItem('token')
    console.log(incidentType);
    console.log(auth);
    let incident = {
        comment: document.getElementById('comment').value,
        file: document.getElementById('file').value,
        location: document.getElementById('location').value
    }
    console.log(incident);
    if (incidentType === 'redflag') {
        //creates redflag
        fetch('http://127.0.0.1:5000/api/v2/reflags', {
            method: 'POST',
            body: JSON.stringify(incident),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`
            }
        })

    }
    else if (incidentType === 'intervention') {
        //creates intervention
        fetch('http://127.0.0.1:5000/api/v2/interventions', {
            method: 'POST',
            body: JSON.stringify(incident),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`
            }

        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    document.getElementById("error").style.display = 'none';
                    window.alert(`${response.message}`)
                }
                else if (response.status === 400) {
                    document.getElementById("error").innerHTML = `${response.message}`
                }
                else if (response.status === 401) {
                    document.getElementById("error").innerHTML = `${response.message}`
                }
            })
            .catch((error) => console.log(error))

    }


}
const cloudary_URL = 'https://api.cloudinary.com/v1_1/dbdnkub5p/upload';
const cloudinary_upload_preset = 'xn3zd5zt';
const createbtn = document.getElementById('create-btn');
let uploadFile = document.getElementById('file');

uploadFile.addEventListener('change', function (event) {
    var file = event.target.files[0];
    console.log(file)
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinary_upload_preset);
    axios({
        url: cloudary_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'cors',
        data: formData
    }).then(function (response) {
        console.log(response);
        let fileurl = response.data.secure_url;
        console.log(fileurl)
        createbtn.addEventListener('click', (e) => {
            e.preventDefault();
            let incidentType = document.getElementById('select').value;
            let auth = localStorage.getItem('token')
            console.log(incidentType);
            console.log(auth);
            let incident = {
                comment: document.getElementById('comment').value,
                file: fileurl,
                location: document.getElementById('location').value
            };
            console.log(incident);
            if (incidentType === 'redflag') {
                //creates redflag
                fetch('https://appireporter2.herokuapp.com/api/v2/redflags', {
                    method: 'POST',
                    body: JSON.stringify(incident),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth}`
                    }
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.status === 201) {
                            document.getElementById("error1").style.display = 'none';
                            document.getElementById("message1").innerHTML = `${response.message}`;
                        }
                        else if (response.status === 400) {
                            document.getElementById("error1").innerHTML = `${response.message}`
                        }
                        else if (response.status === 401) {
                            document.getElementById("error1").innerHTML = `${response.message}`
                        }
                    })
                    .catch((error) => console.log(error));

            }
            else if (incidentType === 'intervention') {
                //creates intervention
                fetch('https://appireporter2.herokuapp.com/api/v2/interventions', {
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
                            document.getElementById("error1").style.display = 'none';
                            document.getElementById("message1").innerHTML = `${response.message}`;
                        }
                        else if (response.status === 400) {
                            document.getElementById("error1").innerHTML = `${response.message}`
                        }
                        else if (response.status === 401) {
                            document.getElementById("error1").innerHTML = `${response.message}`
                        }
                    })
                    .catch((error) => console.log(error))
            }
            else if (incidentType === 'incident') {
                document.getElementById("error1").innerHTML = 'please choose incident type'
            }
        })

    });

}).catch(function (err) {
    console.log(err);
})

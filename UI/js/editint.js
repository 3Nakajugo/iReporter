function edit(incident_id) {
    console.log(incident_id);
    let modal = document.getElementById('myModal');
    let btn = document.getElementById("edit-btn");
    let close = document.getElementsByClassName("close")[0];
    let location_url = `https://appireporter2.herokuapp.com/api/v2/interventions/${incident_id}/location`;
    let comment_url = `https://appireporter2.herokuapp.com/api/v2/interventions/${incident_id}/comment`;
    modal.style.display = "block";
    document.getElementById('results').innerHTML = `
                 <h1>Edit Intervention</h1> 
                <form id="status-form">
                    <p id="error"></p>
                    <select id="select">
                            <option value="status">Select</option>
                            <option value="location">location</option>
                            <option value="comment">comment</option>
                    <input type="text"  id="update" />
                    <input type="submit" class="btn" value="save" />
                </form>
                `
    document.getElementById('status-form').addEventListener('submit', change)
    function change(e) {
        e.preventDefault();
        let select = document.getElementById('select').value;
        let update = document.getElementById('update').value;

        console.log(location);
        console.log(select);
        if (select === 'location') {
            let location = {
                location: update
            }
            fetch(location_url, {
                method: 'PATCH',
                body: JSON.stringify(location),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status === 200) {
                        document.getElementById('error').style.display = 'none';
                        window.location.reload('../templates/redflag.html')
                    }
                    else if (response.status === 400) {
                        document.getElementById('error').innerHTML = `${response.message}`
                    }
                    else {
                        document.getElementById('error').innerHTML = 'Failed to update location'

                    }
                })
        }
        else if (select === 'comment') {

            let comment = {
                comment: update
            }
            fetch(comment_url, {
                method: 'PATCH',
                body: JSON.stringify(comment),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth}`
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status === 200) {
                        document.getElementById('error').style.display = 'none';
                        window.location.reload('../templates/user_redflags.js')
                    }
                    else if (response.status === 400) {
                        document.getElementById('error').innerHTML = `${response.message}`
                    }
                    else {
                        document.getElementById('error').innerHTML = 'Failed to update comment'

                    }
                })

        }
        else {
            document.getElementById('error').innerHTML = 'Update failed'
        }


    }

    close.onclick = function () {
        modal.style.display = "none";
    }
}




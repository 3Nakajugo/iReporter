let auth = localStorage.getItem('token')
info();
function info() {
    let rejected = 0
    let resolved = 0
    let underInvestigation = 0
    let draft = 0

    fetch('https://appireporter2.herokuapp.com/api/v2/interventions', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        }
    })
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            res["data"].forEach(intervention => {

                if (intervention.status === 'draft') {
                    draft++;
                }
                if (intervention.status === 'under investigation') {
                    underInvestigation++;
                }
                if (intervention.status === 'resolved') {
                    resolved++;
                }
                if (intervention.status === 'rejected') {
                    rejected++;
                }
                document.getElementById('intstats').innerHTML = `
                <td>${rejected}</td>
                <td>${underInvestigation}</td>
                <td>${resolved}</td>
                <td>${draft}</td>`


            })
        })
        fetch('https://appireporter2.herokuapp.com/api/v2/redflags', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth}`
            }
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                response["data"].forEach(redflag => {
    
                    if (redflag.status === 'draft') {
                        draft++;
                    }
                    if (redflag.status === 'under investigation') {
                        underInvestigation++;
                    }
                    if (redflag.status === 'resolved') {
                        resolved++;
                    }
                    if (redflag.status === 'rejected') {
                        rejected++;
                    }
                    document.getElementById('redstats').innerHTML = `
                    <td>${rejected}</td>
                    <td>${underInvestigation}</td>
                    <td>${resolved}</td>
                    <td>${draft}</td>`
    
    
                })
            })


}

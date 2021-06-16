window.addEventListener('load', loadData)

let users = []
function loadData(){
    fetch('http://localhost:3000/users', {
        method: 'GET'
    }).then(response => response.json().then(data => {
        console.log(data)
        users = data
    })).catch(error => console.log(error))
}
console.log(users)

document.getElementById('log-in-btn').addEventListener('click', logInCheck)

function logInCheck(){
    const username = document.getElementById('user-username').value
    const password = document.getElementById('user-password').value

    document.getElementById('alert-user').innerHTML = ''

    let index = -1
    for (let i = 0; i < users.length; i++) {
        if(users[i].username == username){
            index = 1
        }
    }
    if(index >= 0){
        for (let i = 0; i < users.length; i++) {
            if(users[i].username == username && users[i].password == password){
                alert('Successfully logged in')
                if(users[i].admin == 1){
                    document.getElementById('menagment-display').style.display = 'inline'
                    window.open(`menagment.html`, '_blank')
                }
                if(users[i].admin == 0){
                    window.open(`products.html`, '_blank')
                }
            }
            
        }
    } else {
        document.getElementById('alert-user').innerHTML = "User doesn't exist"
        document.getElementById('alert-user').style.color = 'red'
    }
}
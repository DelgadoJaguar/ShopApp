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


document.getElementById('register-user').addEventListener('click', registerUser)

function registerUser(){
    const username = document.getElementById('user-username').value
    const password = document.getElementById('user-password').value
    const email = document.getElementById('user-email').value
    const admin = Number(document.getElementById('select-admin').value)

    document.getElementById('alert-user').innerHTML = ''

    let index = 0
    for (let i = 0; i < users.length; i++) {
        if(users[i].username == username){
            index = -1
        }
    }
    if (index >= 0){
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password,
                email,
                admin
            })
        }).then(response => response.json().then(data => {
            console.log(data)
        })).catch(error => console.log(error))
    } else {
        document.getElementById('alert-user').innerHTML = "Username already exist"
        document.getElementById('alert-user').style.color = 'red'
    }
    
    
}
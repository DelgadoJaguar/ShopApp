window.addEventListener('load', loadData)
let productId
let like
function loadData(){
    const locationSearch = window.location.search
    productId = locationSearch.split('=')[1]
    console.log(productId)

    fetch('http://localhost:3000/products/' + productId, {
        method: 'GET',
    }).then(response => response.json().then(data => {
        console.log(data)
        document.getElementById('name').innerHTML = data.name
        document.getElementById('description').innerHTML = data.description
        document.getElementById('price').innerHTML = data.price + '$'
        document.getElementById('info-image-id').src = data.image
    })).catch(error => console.log(error))

    // get likes
    fetch('http://localhost:3000/likes/' + productId, {
        method: 'GET',
    }).then(response => response.json().then(data => {
        console.log(data)
        like = data.like
        document.getElementById('show-likes').innerHTML = data.like
    })).catch(error => console.log(error))
    
}

document.getElementById('add-like').addEventListener('click', addLike)

function addLike(){
    like++

    fetch('http://localhost:3000/likes/' + productId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            like
        })
    }).then(response => response.json().then(data => {
        console.log(data)
    })).catch(error => console.log(error))
}

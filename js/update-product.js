window.addEventListener('load', loadData)
let productId
function loadData(){
    const locationSearch = window.location.search
    productId = locationSearch.split('=')[1]
    console.log(productId)

    fetch('http://localhost:3000/products/' + productId, {
        method: 'GET',
    }).then(response => response.json().then(data => {
        console.log(data)
        document.getElementById('name').value = data.name
        document.getElementById('description').value = data.description
        document.getElementById('price').value = data.price
        document.getElementById('image').value = data.image
        const select = document.getElementById('select')
        select.value = data.cateId
    })).catch(error => console.log(error))
}

document.getElementById('add-product-inputs').addEventListener('click', updateProduct)

function updateProduct(){
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const price = Number(document.getElementById('price').value)
    const image = document.getElementById('image').value
    const cateId = Number(document.getElementById('select').value)
    fetch('http://localhost:3000/products/' + productId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            price,
            image,
            cateId
        })
    }).then(response => response.json().then(data => {
        console.log(data)
    })).catch(error => console.log(error))
}
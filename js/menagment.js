window.addEventListener('load', loadData)
let products = []
function loadData(){
    fetch('http://localhost:3000/products', {
        method: 'GET'
    }).then(response => response.json().then(data => {
        console.log(data)
        products = data
        showProducts(data)
    })).catch(error => console.log(error))
}

function showProducts(product){
    const table = document.getElementById('table')

    for (let i = 0; i < product.length; i++) {
        const tr = document.createElement('tr')
        table.appendChild(tr)
        const tdName = document.createElement('td')
        tdName.innerHTML = product[i].name
        tr.appendChild(tdName)
        const tdDescription = document.createElement('td')
        tdDescription.innerHTML = product[i].description
        tdDescription.style.fontWeight = 300
        tr.appendChild(tdDescription)
        const tdPrice = document.createElement('td')
        tdPrice.innerHTML = product[i].price + '$'
        tr.appendChild(tdPrice)
        // Slika
        const tdImage = document.createElement('td')
        tr.appendChild(tdImage)
        const image = document.createElement('img')
        image.src = product[i].image
        image.width = 40
        image.height = 40
        tdImage.appendChild(image)

        const tdDelete = document.createElement('td')
        tr.appendChild(tdDelete)
        const btnDelete = document.createElement('button')
        btnDelete.innerHTML = '-'
        btnDelete.classList.add('btn-delete')
        tdDelete.appendChild(btnDelete)
        const tdUpdate = document.createElement('td')
        tr.appendChild(tdUpdate)
        const btnUpdate = document.createElement('button')
        btnUpdate.innerHTML = 'Update'
        btnUpdate.classList.add('btn-update')
        tdUpdate.appendChild(btnUpdate)

        btnDelete.addEventListener('click', function(){
            fetch('http://localhost:3000/products/' + product[i].id, {
                method: 'DELETE',
            }).then(response => response.json().then(data => {
                console.log(data)
            })).catch(error => console.log(error))

            fetch('http://localhost:3000/likes/' + product[i].id, {
                method: 'DELETE',
            }).then(response => response.json().then(data => {
                console.log(data)
            })).catch(error => console.log(error))
        })
        btnUpdate.addEventListener('click', function(){
            window.open(`product-update.html?id=${product[i].id}`, '_self')
        })
    }
}
// Adding product to database
document.getElementById('add-product-inputs').addEventListener('click', addProduct)

function addProduct(){
    const name = document.getElementById('name').value
    const description = document.getElementById('description').value
    const price = Number(document.getElementById('price').value)
    const image = document.getElementById('image').value
    const cateId = Number(document.getElementById('select').value)
    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            price,
            image,
            cateId,
        })
    }).then(response => response.json().then(data => {
        console.log(data)
    })).catch(error => console.log(error))

    let like = 0
    fetch('http://localhost:3000/likes', {
        method: 'POST',
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


// Add product look
document.getElementById('addProduct').addEventListener('click', function(){
    document.getElementById('product-inputs').style.display = 'block'
})
document.getElementById('close-inputs').addEventListener('click', function(){
    document.getElementById('product-inputs').style.display = 'none'
})
window.addEventListener('load', loadData)
let products = []
let sortedPrices = []
function loadData(){
    fetch('http://localhost:3000/products', {
        method: 'GET'
    }).then(response => response.json().then(data => {
        console.log(data)
        products = data
        sortedPrices = data
        showProducts(data)
    })).catch(error => console.log(error))
}
const divProducts = document.getElementById('hero-products')

function showProducts(product){
    divProducts.innerHTML = ''
    for (let i = 0; i < product.length; i++) {
        let counterQuantity = 0
        const divProduct = document.createElement('div')
        divProduct.classList.add('data-products')
        divProduct.style.padding = '15px 15px'
        divProducts.appendChild(divProduct)
        const image = document.createElement('img')
        image.src = product[i].image
        divProduct.appendChild(image)
        const name = document.createElement('h3')
        name.innerHTML = product[i].name
        divProduct.appendChild(name)
        const description = document.createElement('p')
        description.innerHTML = product[i].description
        divProduct.appendChild(description)
        // Poseban div za price i minus plus dugme da budu jedno pored drugog
        const divPriceQuantity = document.createElement('div')
        divPriceQuantity.style.display = 'flex'
        divPriceQuantity.style.justifyContent = 'space-between'
        divProduct.appendChild(divPriceQuantity)

        const price = document.createElement('h5')
        price.innerHTML = product[i].price + ' $'
        divPriceQuantity.appendChild(price)

        // Poseban div za plus minus kako bi lepo izgledali na stranici
        const divPlusMinus = document.createElement('div')
        divPlusMinus.classList.add('plus-minus-buttons')
        divPriceQuantity.appendChild(divPlusMinus)

        const minusQ = document.createElement('button')
        minusQ.innerHTML = '-'
        minusQ.style.visibility ='hidden'
        divPlusMinus.appendChild(minusQ)
        const plusQ = document.createElement('button')
        plusQ.innerHTML = '+'
        divPlusMinus.appendChild(plusQ)

        const divCounterInfo = document.createElement('div')
        divCounterInfo.style.display = 'flex'
        divCounterInfo.style.justifyContent = 'space-between'
        divProduct.appendChild(divCounterInfo)

        const divCounterShow = document.createElement('div')
        divCounterInfo.appendChild(divCounterShow)
        // More info
        const divMoreInfo = document.createElement('div')
        divCounterInfo.appendChild(divMoreInfo)
        //More info Button
        const btnMoreInfo = document.createElement('button')
        btnMoreInfo.innerHTML = 'More info'
        btnMoreInfo.id = 'btn-more-info'
        divMoreInfo.appendChild(btnMoreInfo)
        // Button opening next window where info is
        btnMoreInfo.addEventListener('click', function(){
            window.open(`more-product-info.html?id=${product[i].id}`, '_self')
        })

        // povecavanje i smanjivanje quantity-a
        plusQ.addEventListener('click', function () {
            counterQuantity++
            console.log(counterQuantity)
            divCounterShow.innerHTML = 'Quantity: ' + counterQuantity
            minusQ.style.visibility ='visible'
            price.innerHTML = product[i].price * counterQuantity + '$'
        })
        minusQ.addEventListener('click', function () {
            if(counterQuantity > 0){
                counterQuantity--
                console.log(counterQuantity)
                divCounterShow.innerHTML = 'Quantity: ' + counterQuantity
                price.innerHTML = product[i].price * counterQuantity + '$'
            }
            if(counterQuantity <= 0){
                minusQ.style.visibility ='hidden'
                price.innerHTML = product[i].price + '$'
                divCounterShow.innerHTML = ''
            }
        })
        
    }
}
// filtriramo proizvode

function filterProducts(value){
    let productsFiltered = []
    for (let i = 0; i < products.length; i++) {
        if(products[i].cateId == value){
            productsFiltered.push(products[i])
        }
    }
    showProducts(productsFiltered)
    console.log(productsFiltered)
}
// sortiranje po ceni rastuce/opadajuce
function sortByPrices(value){
    
    if(value == 'lowToHigh'){
        console.log('asd')
        sortedPrices.sort(function (a, b) {
            return a.price - b.price;
        });
        console.log(sortedPrices)
    }
    if(value == 'highToLow'){
        console.log('asd')
        sortedPrices.sort(function (a, b) {
            return b.price - a.price;
        });
        console.log(sortedPrices)
    }
    showProducts(sortedPrices)
}

document.getElementById('close-products-list').addEventListener('click', function(){
    document.querySelector('.list-products').style.display = "none"
    document.getElementById('show-list-products').style.display = "block"
})
document.getElementById('show-list-products').addEventListener('click', function(){
    document.querySelector('.list-products').style.display = "block"
    document.getElementById('show-list-products').style.display = "none"
})
console.log(products)
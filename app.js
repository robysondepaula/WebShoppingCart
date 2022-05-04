const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCarrito = document.getElementById("template-carrito").content
const fragment = document.createDocumentFragment()
let shopCard = {}

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})

cards.addEventListener("click", e =>{
    addCard(e);
})


const fetchData = async() => {
    try{
        const res = await fetch('api.json')
        const data = await res.json()
        //console.log(data)
        paintingCards(data);
    }catch(error){
        console.log(error)
    }
}

const paintingCards = data =>{
    data.forEach(product => {
       templateCard.querySelector("h5").textContent = product.title
       templateCard.querySelector("p").textContent = product.precio
       templateCard.querySelector("img").setAttribute("src", product.thumbnailUrl)
       templateCard.querySelector(".btn-dark").dataset.id = product.id
       
       const clone = templateCard.cloneNode(true);
       fragment.appendChild(clone)
    })
    cards.appendChild(fragment);
}


const addCard = e => {
   // console.log(e.target)
    //console.log(e.target.classList.contains("btn-dark"))
    if(e.target.classList.contains("btn-dark")){
     
        setCard(e.target.parentElement);

    }
    e.stopPropagation();
}

const setCard = object => {
    
    const product = {
        id: object.querySelector(".btn-dark").dataset.id,
        title: object.querySelector("h5").textContent,
        precio: object.querySelector("p").textContent,
        cantidad : 1
    }

    if(shopCard.hasOwnProperty(product.id)){
        product.cantidad = shopCard[product.id].cantidad + 1 ;
    }

    shopCard[product.id] = {...product}

    paintCard()


}

const paintCard = () =>{
//console.log(shopCard);
    items.innerHTML = ''
Object.values(shopCard).forEach(product => {
    templateCarrito.querySelector("th").textContent = product.id
    templateCarrito.querySelectorAll("td")[0].textContent = product.title
    templateCarrito.querySelectorAll("td")[1].textContent = product.cantidad
    templateCarrito.querySelector(".btn-info").dataset.id = product.id
    templateCarrito.querySelector(".btn-danger").dataset.id = product.id
    templateCarrito.querySelector("span").textContent = product.cantidad * product.precio

    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)

})
items.appendChild(fragment);


paintFotter()
}

const paintFotter = () => {
    footer.innerHTML = ''
    if(Object.keys(shopCard).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Empty Card! - start to buy!!</th>
        `
        return
    }

    const nQuantity = Object.values(shopCard).reduce((acc, {cantidad}) =>  acc + cantidad,0)
    const nPrice = Object.values(shopCard).reduce((acc, {cantidad, precio})=> acc + cantidad * precio, 0)
    
    templateFooter.querySelectorAll("td")[0].textContent = nQuantity
    templateFooter.querySelector("span").textContent = nPrice

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const btnEmpty = document.getElementById("vaciar-carrito")
    btnEmpty.addEventListener("click", ()=>{
        shopCard ={}
        paintCard();
    })

}

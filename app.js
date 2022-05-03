const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content
const fragment = document.createDocumentFragment()
let shopCard = {}

document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})

items.addEventListener("click", e =>{
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
    items.appendChild(fragment);
}


const addCard = e => {

}
//Parei em 32:41  https://www.youtube.com/watch?v=JL7Wo-ASah4
const sortType = document.getElementById("sortType")
const main = document.querySelector("main")
const tovars = document.querySelector(".tovars")

let selected

class Show{
    constructor(category, title, image, price){
        this.category = category
        this.title = title
        this.image = image
        this.price = price
    }



    render(){
        tovars.innerHTML += `
        <div class="tovar">
            <img src="${this.image}" alt="" class="tovar_img">
            <p class="tovar_title">${this.title}</p>
            <div class="tovar_data">
                <p class="tovar_price">${this.price}</p>
                <img src="./img/корзина.png" alt="" class="tovar_bin">
            </div>
        </div>`
    }
}


fetch("https://fakestoreapi.com/products")
.then(res=> res.json())
.then(data =>{
    console.log(data)
    renderTovars(data)
    
    sortType.addEventListener("change", ()=>{
        selected = sortType.value
        console.log(selected);
        tovars.innerHTML = ""
        if (selected != "all"){
            for (let i = 0; i < data.length; i++) {
                let tovar = new Show(data[i].category, data[i].title, data[i].image, data[i].price)
                if (tovar.category == selected) {
                    tovar.render() 
                }
            }            
        }
        else{
            renderTovars(data)
        }

        
        
    })
})

function renderTovars(data) {
    for (let i = 0; i < data.length; i++) {
        let tovar = new Show(data[i].category, data[i].title, data[i].image, data[i].price)
        tovar.render()
    }
}
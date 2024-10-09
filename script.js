const sortType = document.getElementById("sortType")
const main = document.querySelector("main")
const tovars = document.querySelector(".tovars") //основные константы

let selected

class Show{ //Использовал классы
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
    } //Буквальный рендер через this, впихивает в хтмл
    variableAll(){
        let tovarList = document.querySelectorAll(".tovar_bin")
        return tovarList
    } //Создает переменную для всех товаров на странице
}
let tovarBin

let binList = []

fetch("https://fakestoreapi.com/products")
.then(res=> res.json())
.then(data =>{
    console.log(data)
    renderTovars(data)
    let tovar = new Show(data.category, data.title, data.image, data.price)

    function getTarget(tovar) {
            tovarBin = tovar.variableAll()
            console.log(tovarBin)
            tovarBin.forEach((e, index)=> e.addEventListener("click", function (e) {
                let tovarAllData = e.target.parentElement.parentElement.children
                tovarData = tovarAllData[2].children
                tovarImg = tovarAllData[0].src
                tovarTitle = tovarAllData[1].innerText
                tovarPrice = tovarData[0].innerText
                console.log(tovarImg, tovarTitle, tovarPrice, index) //Получает все данные в виде текста
                for (let k = 0; k < data.length; k++) {
                    if (data[k].title == tovarTitle || data[k].image == tovarImg) {
                        let bin = {
                            category: data[k].category,
                            title: data[k].title,
                            image: data[k].image, 
                            price: data[k].price
                        }
                        binList.push(bin)
                        localStorage.setItem("binStorage", JSON.stringify(binList))
                    }
                    
                }

            })  )
            
        }   
    
    getTarget(tovar)
     
       
    sortType.addEventListener("change", ()=>{
        selected = sortType.value
        console.log(selected);
        tovars.innerHTML = ""
        if (selected != "all"){
            for (let i = 0; i < data.length; i++) {
                let sortTovar = new Show(data[i].category, data[i].title, data[i].image, data[i].price)
                if (sortTovar.category == selected) {
                    sortTovar.render()
                    getTarget(sortTovar)
                }
            }
            
        }
        else{
            renderTovars(data)

            getTarget(tovar)
        }
        
        

    })
})

function renderTovars(data) {
    for (let i = 0; i < data.length; i++) {
        let tovar = new Show(data[i].category, data[i].title, data[i].image, data[i].price)
        tovar.render()
    }
}

localStorage.clear()


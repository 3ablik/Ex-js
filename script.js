const sortType = document.getElementById("sortType")
const main = document.querySelector("main")
const tovars = document.querySelector(".tovars") //основные константы
const bin = document.getElementById("bin_point")
const profile = document.getElementById("profile_point")
let exitBtn = document.getElementById("exit_btn")
const nav = document.querySelector(".header__nav_me")
const search = document.getElementById("search_by_name")


let logged = false
let exiting = false

if (JSON.parse(localStorage.getItem("logged")) == true){
    logged = true
}
else if(localStorage.getItem("logged") == null){
    logged = false
}

let selected

profile.addEventListener("click", (e)=>{
    if (logged) {
        e.stopPropagation() // Я не знаю как работает, но без этого не работает
        exitBtn.style.display = "block"
        profile.style.display = "none"
        exitBtn.style.display = "block"
        exitBtn.style.background = "red"
        exitBtn.style.color = "white"
        exitBtn.style.fontSize = "12px"
        exitBtn.innerText = "Выйти???"
        exiting = true        
    }
    else{
        window.location.href = "login.html"
    }

})

exitBtn.addEventListener("click", ()=>{
    window.location.href = "login.html"
    
})
document.addEventListener("click", (e) => {
    console.log(e)
    if (e.target !== exitBtn) {
        exitBtn.style.display = "none"
        profile.style.display ="block"
        exiting = false
    }
}) 


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
let binList


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
                if (JSON.parse(localStorage.getItem("binStorage")) < 1) {
                    binList = []
                }
                else{
                    binList = JSON.parse(localStorage.getItem("binStorage"))
                }
                let tovarAllData = e.target.parentElement.parentElement.children
                tovarData = tovarAllData[2].children
                tovarImg = tovarAllData[0].src
                tovarTitle = tovarAllData[1].innerText
                tovarPrice = tovarData[0].innerText
                console.log(tovarImg, tovarTitle, tovarPrice, index) //Получает все данные в виде текста

                for (let k = 0; k < data.length; k++) {
                    if (data[k].title == tovarTitle || data[k].image == tovarImg) {


                        let existingTovar = binList.find(item => item.title.trim() == tovarTitle)
                        console.log(existingTovar)
                        if (existingTovar) {
                            // Если товар уже в корзине, увеличиваем его количество
                            existingTovar.amount += 1
                        }


                        else{
                            let bin = {
                                category: data[k].category,
                                title: data[k].title,
                                image: data[k].image, 
                                price: data[k].price,
                                amount: 1
                            }
                            binList.push(bin)                      
                        }
                        localStorage.setItem("binStorage", JSON.stringify(binList))  

                    }
                    
                }

            })  )
            
        }   
    
    if (logged == true) {
        getTarget(tovar)
    }
    else{
        tovarBin = tovar.variableAll()
        console.log(tovarBin)
        tovarBin.forEach((e, index)=> e.addEventListener("click", function (e) {
            if (JSON.parse(localStorage.getItem("binStorage")) < 1) {
                binList = []
            }
            else{
                binList = JSON.parse(localStorage.getItem("binStorage"))
            }
            let tovarCard = e.target.parentElement.parentElement
            console.log(tovarCard, index)
            let errorMsg = document.createElement("p")
            errorMsg.textContent = "Please, Login first"
            errorMsg.style.color = "red"
            tovarCard.append(errorMsg)
        }))
    }
     
       
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

    search.addEventListener("change", ()=>{
        let searchInput = search.value
        let results = data.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase()));
        console.log(results);
        tovars.innerHTML = ""
        renderTovars(results)
    })
})

function renderTovars(data) {
    for (let i = 0; i < data.length; i++) {
        let tovar = new Show(data[i].category, data[i].title, data[i].image, data[i].price)
        tovar.render()
    }
}

const sortType = document.getElementById("sortType")
const main = document.querySelector("main")
const tovars = document.querySelector(".tovars") //основные константы
const search = document.getElementById("search_by_name")

const bin = document.getElementById("bin_point")
const profile = document.getElementById("profile_point")
const nav = document.querySelector(".header__nav_me")
const navAll = document.getElementsByClassName("header__nav")
const hello = document.getElementById("header-title")
let exitBtn = document.getElementById("exit_btn")
const ls = document.getElementById("ls_point")



let exiting = false
let logged = false

if (JSON.parse(localStorage.getItem("logged")) == true){
    logged = true
    userNowId = JSON.parse(localStorage.getItem("lastUserLogged"))[0]
    userName = JSON.parse(localStorage.getItem("lastUserLogged"))[1]
    hello.textContent = `САЛАМАЛЕЙКУМ ${userName}`    
}

else if(localStorage.getItem("logged") == null){
    logged = false
}



let selected

profile.addEventListener("click", (e)=>{
    if (logged) {
        e.stopPropagation() // Я не знаю как работает, но без этого не работает
        profile.style.display = "none"
        exitBtn.style.display = "block"
        exitBtn.style.display = "block"
        exitBtn.style.background = "red"
        exitBtn.style.color = "white"
        exitBtn.style.fontSize = "12px"
        exitBtn.innerText = "Выйти???"
        exiting = true

        ls.style.display = "block"
        ls.style.background = "white"
        ls.style.color = "black"
        ls.style.fontSize = "12px"
        ls.innerText = "Личка"
    }
    else{
        window.location.href = "login.html"
    }

})

exitBtn.addEventListener("click", ()=>{
    window.location.href = "login.html"
})

ls.addEventListener("click", ()=>{
    window.location.href = "ls.html"
})


document.addEventListener("click", (e) => {
    console.log(e)
    if (e.target !== exitBtn || e.target !==ls) {
        exitBtn.style.display = "none"
        ls.style.display = "none"
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
                <img src="./img/корзина.png" alt="" class="tovar_bin animation">
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


            tovarBin.forEach((e)=>{
                $(e).click(function(){
                    $(document).ready(function(){
                        $(e).animate({  now: '-=50' }, {
                            duration:300,
                            step: function(now,fx) {
                                $(this).css('transform','rotate('+now+'deg)');
                            }
                        });
                    
                        $(e).animate({  now: '+=440' }, {
                            duration:1000,
                            step: function(now,fx) {
                              $(this).css('transform','rotate('+now+'deg)');  
                            }
                        });
                    
                        $(e).animate({  now: '-=50' }, {
                            duration:200,
                            step: function(now,fx) {
                              $(this).css('transform','rotate('+now+'deg)');  
                            }
                        });
                        $(e).animate({  now: '+=40' }, {
                            duration:200,
                            step: function(now,fx) {
                              $(this).css('transform','rotate('+now+'deg)');  
                            }
                        });
                        $(e).animate({  now: '-=20' }, {
                            duration:200,
                            step: function(now,fx) {
                              $(this).css('transform','rotate('+now+'deg)');  
                            }
                        });
                    
                    })
                })}) //Анимация корзинки

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


                        let existingTovar = binList.find(item => item.title.trim() == tovarTitle && item.id == userNowId)
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
                                id: userNowId,
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

    search.addEventListener("input", ()=>{
        let searchInput = search.value
        let results = data.filter(item => item.title.toLowerCase().includes(searchInput.toLowerCase()));
        console.log(results);
        tovars.innerHTML = ""
        renderTovars(results)
        getTarget(tovar)
        if (tovars.childElementCount == 0) {
            tovars.innerHTML = `<p class="desc">Ничего не найдено<p>`
        }
    })
})

function renderTovars(data) {
    for (let i = 0; i < data.length; i++) {
        let tovar = new Show(data[i].category, data[i].title, data[i].image, data[i].price)
        tovar.render()
        
    }
    
}

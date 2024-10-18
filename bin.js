let binTovars = JSON.parse(localStorage.getItem("binStorage"))
let bins = document.querySelector(".bins")
const main = document.querySelector(".main")


class Show{ //Использовал классы
    constructor(category, title, image, price, amount){
        this.category = category
        this.title = title
        this.image = image
        this.price = price
        this.amount = amount
    }



    render(){
        bins.innerHTML += `
        <div class="tovar">
            <img src="${this.image}" alt="" class="tovar_img">
            <p class="tovar_title">${this.title}</p>
            <div class="tovar_data">
                <p class="tovar_price">${this.price*this.amount}</p>
                <div class = "amount_all">
                    <button class="tovar_price reduce">-</button>
                    <p class="tovar_price">${this.amount}</p>
                    <button class="tovar_price up">+</button>
                </div>

            </div>
        </div>`
        console.log(this.image)
        console.log(this.title)
        console.log(this.price)
        console.log(this.amount)
    } //Буквальный рендер через this, впихивает в хтмл
}



if (binTovars != null) {
    binTovars.forEach(element => {
        let tovarShow = new Show(element.category, element.title, element.image, element.price, element.amount)
        tovarShow.render()
    });
    main.innerHTML += `<a href="./payZone.html"><button id="buyBin">Купить все</button></a>`
}
else{
    main.innerHTML += `<p class="desc">Пусто...</p>`
}
const reduceBtn = document.querySelectorAll(".reduce")
const upBtn = document.getElementById("up")
let uBinStorage = binTovars
console.log(reduceBtn)
reduceBtn.forEach((e, index)=>{
    e.addEventListener("click", ()=>{
        console.log(e)
        let tovarAllData = e.parentElement.parentElement.parentElement.children
        tovarData = tovarAllData[2].children
        tovarImg = tovarAllData[0].src
        tovarTitle = tovarAllData[1].innerText
        tovarAmount = tovarData[1].children[1].innerText
        console.log(tovarAmount)
        console.log(tovarImg, tovarTitle, tovarAmount, index) //Получает все данные в виде текста
        tovarAmount--
        console.log(uBinStorage)
        for (let i = 0; i < uBinStorage.length; i++) {
            console.log(tovarTitle)
            console.log(uBinStorage[i].title.trim())

            if (tovarTitle == uBinStorage[i].title.trim()) {
                uBinStorage[i].amount = tovarAmount
            }
            
        }
        console.log(uBinStorage)
        bins.innerHTML = ''
        uBinStorage.forEach(element => {
            console.log(element)
            let newTovarShow = new Show(element.category, element.title, element.image, element.price, element.amount)
            newTovarShow.render()
            
        });
    })
})
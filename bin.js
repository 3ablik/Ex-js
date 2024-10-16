const binTovars = JSON.parse(localStorage.getItem("binStorage"))
const bins = document.querySelector(".bins")
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
                <p class="tovar_price">${this.price}</p>
                <p class="tovar_price">${this.amount}</p>

            </div>
        </div>`
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

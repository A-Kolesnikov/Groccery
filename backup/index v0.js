console.log("Index ready")

function clear(element){
    element.innerHTML = ''
}

function updateItem(obj, item){
    clear(item)
    if(item.id < 0){
        if(obj.inList === 0){
            item.classList.remove("item")
            return
        } else {
            fillItem(obj, item)
            item.classList.add("item")
        }
    } else {
        fillItem(obj, item)
        if(obj.quantity === 0){
            item.classList.add("inactive")
        } else {
            item.classList.remove("inactive")
        }
    }
    function fillItem(obj, item){
        const foodPic = document.createElement("img");
        foodPic.classList.add("foodPic");
        foodPic.setAttribute('src', `${obj.pic}`);
        foodPic.setAttribute('alt', "food pic");
    
        const itemInfo = document.createElement("div");
        itemInfo.classList.add("itemInfo");
        
        const itemName = document.createElement("h4")
        itemName.textContent = `${obj.itemName}`
    
        const price = document.createElement("p")
        price.textContent = `${obj.price} $`
    
        const quantity = document.createElement("p")
        if(item.id > 0){
            quantity.textContent = `Available: ${obj.quantity} pcs`
        } else {
            quantity.textContent = `In cart: ${obj.inList} pcs`
        }
    
        itemInfo.appendChild(itemName)
        itemInfo.appendChild(price)
        itemInfo.appendChild(quantity)
        item.appendChild(foodPic)
        item.appendChild(itemInfo)

        //Update Order Summary
        clear(totalPrice)
        clear(totalInList)
        totalPrice.textContent = totalNumber("price")
        totalInList.textContent = totalNumber("inList")
    }
}

function totalNumber(element){
    let result = 0;
    if(element === "price"){
        for(var i = 0; i< Item.storage.length; i++){
            result += Item.storage[i].price * Item.storage[i].inList
        }
    } else if(element === "inList") {
        for(var i = 0; i< Item.storage.length; i++){
            result += Item.storage[i].inList
        }
    }
    return result
}

function initItems(){
    clear(store)
    clear(cart)
    clear(totalPrice)
    clear(totalInList)
    
    for (let obj of Item.storage){
        const item1 = document.createElement("div");
        item1.classList.add("item");
        item1.classList.add("inStore");
        item1.setAttribute('id', `${obj.id}`)
        updateItem(obj, item1)
        store.appendChild(item1)

        const item2 = document.createElement("div");
        item2.classList.add("inCart");
        item2.setAttribute('id', `${-1*obj.id}`)
        updateItem(obj, item2)
        cart.appendChild(item2)
    }

        totalPrice.textContent = totalNumber("price")
        totalInList.textContent = totalNumber("inList")
}

function order(){
    snapShot = content.innerHTML
    content.innerHTML = '<button onclick="bySomeMore()">Buy something else</button>'
}
function bySomeMore(){
    content.innerHTML = snapShot
    itemsInStore = document.querySelectorAll(".inStore")
    itemsInCart = document.querySelectorAll(".inCart")
}

//Dynamic content variables
const store = document.querySelector("#store");
const cart = document.querySelector("#cart");
const totalPrice = document.querySelector("#totalPrice")
const totalInList = document.querySelector("#totalInList")
const content = document.querySelector(".content")
const lS = localStorage
let lS_Items
//let snapShot //for order function

//Initiate local storage
if(lS.getItem('lS_Items')==null){
    lS_Items = Item.storage;
    lS.setItem('lS_Items', JSON.stringify(lS_Items));
} else {
    lS_Items = JSON.parse(lS.getItem('lS_Items'))
}
console.log(lS_Items[6])

initItems();

let itemsInStore = document.querySelectorAll(".inStore")
let itemsInCart = document.querySelectorAll(".inCart")
for (let element of itemsInStore){
    element.addEventListener("click", ()=>{
        console.log(element.id)
        Item.storage[element.id-1].toList()
        updateItem(Item.storage[element.id-1], element)
        updateItem(Item.storage[element.id-1], itemsInCart[element.id-1])
    })
}
for (let element of itemsInCart){
    element.addEventListener("click", ()=>{
        console.log(element.id)
        Item.storage[-1*element.id-1].fromList()
        updateItem(Item.storage[-1*element.id-1], element)
        updateItem(Item.storage[-1*element.id-1], itemsInStore[-1*element.id-1])
    })
}
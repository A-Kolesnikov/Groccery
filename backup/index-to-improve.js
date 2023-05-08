console.log("Index ready")

function clear(element){
    element.innerHTML = ''
}
/*function resetAtributes(element){
    while(element.attributes.length > 0)
    element.removeAttribute(element.attributes[0].name);
}*/

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
        for(var i = 0; i< lS_Items.length; i++){
            result += lS_Items[i].price * lS_Items[i].inList
        }
    } else if(element === "inList") {
        for(var i = 0; i< lS_Items.length; i++){
            result += lS_Items[i].inList
        }
    }
    return result
}

function initItems(){
    clear(store)
    clear(cart)
    clear(totalPrice)
    clear(totalInList)
    
    for (let obj of lS_Items){
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

function lS_Update(){
    lS.setItem('lS_Items', JSON.stringify(lS_Items));
}


//Dynamic content variables
const store = document.querySelector("#store");
const cart = document.querySelector("#cart");
const totalPrice = document.querySelector("#totalPrice")
const totalInList = document.querySelector("#totalInList")
const content = document.querySelector(".content")
const lS = localStorage
let lS_Items
let snapShot

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
        lS_Items[element.id-1].toList()
        lS_Update()
        updateItem(lS_Items[element.id-1], element)
        updateItem(lS_Items[element.id-1], lS_Items[element.id-1])
    })
}
for (let element of itemsInCart){
    element.addEventListener("click", ()=>{
        console.log(element.id)
        lS_Items[-1*element.id-1].fromList()
        lS_Update()
        updateItem(lS_Items[-1*element.id-1], element)
        updateItem(lS_Items[-1*element.id-1], itemsInStore[-1*element.id-1])
    })
}
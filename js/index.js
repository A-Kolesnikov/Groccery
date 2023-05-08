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
        price.textContent = `${obj.price} ₪`
    
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
        //clear(totalPrice)
        //clear(totalInList)
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
    if (!confirm("Are you sure?")){return}
    content.innerHTML = ''
    const section = document.createElement("section")
    section.classList.add("bottomSection");

    const summary = document.createElement("div")
    summary.classList.add("orderDetails")

    const h3 = document.createElement("h3")
    h3.textContent = "Order details:"
    summary.appendChild(h3)

    let totalMoney = 0;

    for(element of Item.storage){
        if (element.inList > 0){
            const h4 = document.createElement("h5")
            h4.textContent = `${element.itemName}: `
            const p = document.createElement("p")
            p.textContent = `Quantity: ${element.inList} pcs, Total price: ${element.inList * element.price} ₪`;
            totalMoney += element.inList * element.price
            summary.appendChild(h4)
            summary.appendChild(p)
        }
    }

    const h2 = document.createElement("h2")
    h2.textContent = `Total price: ${totalMoney} ₪`
    summary.appendChild(h2)

    const button1 = document.createElement("button")
    button1.textContent = "Pay"
    button1.setAttribute('onclick', "pay()")
    summary.appendChild(button1)

    const button2 = document.createElement("button")
    button2.textContent = "Buy something else"
    button2.setAttribute('onclick', "bySomeMore()")
    summary.appendChild(button1)
    summary.appendChild(button2)

    section.appendChild(summary)
    content.appendChild(section)

}

function bySomeMore(){
    window.location.reload();
}
function pay(){
    alert("Connecting to payments system!")
}

function lS_Update(){
    lS.setItem('lS_Items', JSON.stringify(Item.storage));
}

function cancel(){
    lS.removeItem('lS_Items');
    window.location.reload();
}

//Dynamic content variables
const store = document.querySelector("#store");
const cart = document.querySelector("#cart");
const totalPrice = document.querySelector("#totalPrice")
const totalInList = document.querySelector("#totalInList")
const content = document.querySelector(".content")


//Initiate local storage
if(lS.getItem('lS_Items')==null){
    lS.setItem('lS_Items', JSON.stringify(Item.storage));
}

initItems();

let itemsInStore = document.querySelectorAll(".inStore")
let itemsInCart = document.querySelectorAll(".inCart")
for (let element of itemsInStore){
    element.addEventListener("click", ()=>{
        Item.storage[element.id-1].toList()
        lS_Update()
        updateItem(Item.storage[element.id-1], element)
        updateItem(Item.storage[element.id-1], itemsInCart[element.id-1])
    })
}
for (let element of itemsInCart){
    element.addEventListener("click", ()=>{
        Item.storage[-1*element.id-1].fromList()
        lS_Update()
        updateItem(Item.storage[-1*element.id-1], element)
        updateItem(Item.storage[-1*element.id-1], itemsInStore[-1*element.id-1])
    })
}
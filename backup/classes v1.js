console.log("Classes ready")

class Item{
    constructor(pic, itemName, price, quantity, inList){
        this.id = Item.storage.length+1;
        this.pic = pic;
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
        this.inList = inList;
        Item.storage.push(this);
    }

    toList(){
        if(this.quantity > 0){
            this.quantity--;
            this.inList++;
        }
    }

    fromList(){
        if(this.inList > 0){
            this.quantity++;
            this.inList--;
        }
    }

    static Storage(){
        return Item.storage;
    }
}
Item.storage = []

const lS = localStorage
let lS_Items = ''

if(lS.getItem('lS_Items')==null){
    const milk = new Item("img/milk.jpg", "Milk", 5, 50, 0);
    const coffee = new Item("img/coffee.jpg", "Coffee", 16, 10, 0);
    const cheese = new Item("img/cheese.jpg", "Cheese", 15, 10, 0);
    const bread = new Item("img/bread.jpg", "Bread", 4.9, 100, 0);
    const tomato = new Item("img/tomato.jpg", "Tomato", 3.9, 100, 0);
    const buter = new Item("img/butter.jpg", "Butter", 12, 10, 0);
    const meat = new Item("img/meat.jpg", "Meat", 25, 5, 0);
} else {
    lS_Items = JSON.parse(lS.getItem('lS_Items'))
    const milk = new Item("img/milk.jpg", "Milk", 5, lS_Items[0].quantity, lS_Items[0].inList);
    const coffee = new Item("img/coffee.jpg", "Coffee", 16, lS_Items[1].quantity, lS_Items[1].inList);
    const cheese = new Item("img/cheese.jpg", "Cheese", 15, lS_Items[2].quantity, lS_Items[2].inList);
    const bread = new Item("img/bread.jpg", "Bread", 4.9, lS_Items[3].quantity, lS_Items[3].inList);
    const tomato = new Item("img/tomato.jpg", "Tomato", 3.9, lS_Items[4].quantity, lS_Items[4].inList);
    const buter = new Item("img/butter.jpg", "Butter", 12, lS_Items[5].quantity, lS_Items[5].inList);
    const meat = new Item("img/meat.jpg", "Meat", 25, lS_Items[6].quantity, lS_Items[6].inList);
}
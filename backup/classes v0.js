console.log("Classes ready")

class Item{
    constructor(pic, itemName, price, quantity){
        this.id = Item.storage.length+1;
        this.pic = pic;
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
        this.inList = 0;
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

const milk = new Item("img/milk.jpg", "Milk", 5, 50);
const coffee = new Item("img/coffee.jpg", "Coffee", 16, 10);
const cheese = new Item("img/cheese.jpg", "Cheese", 15, 10);
const bread = new Item("img/bread.jpg", "Bread", 4.99, 100);
const tomato = new Item("img/tomato.jpg", "Tomato", 3.99, 100);
const buter = new Item("img/butter.jpg", "Butter", 12, 10);
const meat = new Item("img/meat.jpg", "Meat", 25, 5);
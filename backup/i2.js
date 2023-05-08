function decreaseQuantityInSoppingList(e) {
    shoppingListSection.innerHTML = ''

    const itemId = e.target.id
    
    for(const item of shoppingList){
        if(item.id == itemId) {
            const newGrocery = Object.assign({}, item)
            
            if (newGrocery.quantity >= 1){
                item.quantity--
                newGrocery.quantity = item.quantity  
                shoppingList[item] = newGrocery                
            } else if (newGrocery.id == itemId){
                shoppingList.splice(newGrocery, 1)
            }           
        }
    }  
    
    buildShoppingList()
    buildTotal()
}
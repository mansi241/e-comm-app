export function getCartItemCount(cartItems) {
    return cartItems.reduce((sum,cartItem)=>cartItem.quantity+sum,0);
}

export function getSubtotal(cartItem) {
    return cartItem.reduce((sum,{product, quantity})=> sum+(product.price * quantity),0)
}
export function getCartItemCount(cartItems) {
    return cartItems.reduce((sum,cartItem)=>cartItem.quantity+sum,0);
}
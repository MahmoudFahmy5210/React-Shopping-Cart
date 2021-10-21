import { CLEAR_CART,ADD_TO_CART, Remove_FROM_CART } from "../types";

export const addToCart=(product ) =>(dispatch,getState) =>{
    const cartItems = getState().cart.cartItems.slice();
    let alreadyInCart=false;
    cartItems.forEach(element => {
        if(element._id === product._id){
            alreadyInCart=true;
            element.count++;
            
        }
    }); 
    if(!alreadyInCart){
        cartItems.push({...product,count:1});
    }
    dispatch({
        type:ADD_TO_CART,
        payload: { cartItems }
    });
     localStorage.setItem("cartItems",JSON.stringify(cartItems));//"cartItems" is the key and cartItems is the value
}
export const removeFromCart = (product) => ( dispatch , getState) =>
{
    const cartItems=getState().cart.cartItems.slice().filter((x) => x._id !== product._id);
    dispatch({
        type:Remove_FROM_CART,
        payload:{cartItems}
    })
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  };
export const clearCart =() =>(dispatch)=>{
   
    dispatch({type:CLEAR_CART});
}
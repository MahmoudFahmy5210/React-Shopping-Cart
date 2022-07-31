import {  CLEAR_ORDER, CREATE_ORDER } from "../types"

export const createOrder =(order)=>(dispatch)=>{
    //send an ajax request to server to create order,it should be
    //done by fetch method
    fetch("/api/orders",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(order),
    })
    .then(res=>res.json())//The res.json() function sends a JSON response.
    .then(data=>
        {
        dispatch({ type:CREATE_ORDER, payload:data });
        localStorage.clear("cartItems");
               
    });
    
};
export const clearOrder =() =>(dispatch)=>{
    dispatch({type:CLEAR_ORDER});
};

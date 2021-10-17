import { FETCH_PRODUCTS } from '../types';

//bring to me all the product
export const fetchProducts =() => async (dispatch) => {
    //res will carry all the data
   const res= await fetch("/api/products");
   const data=await res.json();
   console.log(data);
    dispatch({
        type:FETCH_PRODUCTS,
        payload:data,
    });
};
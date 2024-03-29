//import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
//import data from "./data.json"
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from  './components/Cart';
import Zoom from 'react-reveal/Zoom';
import store from "./store";
import { Provider } from 'react-redux';
class App extends Component {
  createOrder = (order) => {
    alert("Are you sure you need to save this order " + order.name);
    
  };
  /*
  removeFromCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    this.setState({
      cartItems:cartItems.filter(x=> x._id !== product._id)///this will remove the removed product
    });
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=> x._id !== product._id)));
  }
   s4
  addToCart =(product)=>{
    const cartItems = this.state.cartItems.slice();//this will create a copy of the state cartItems array
    let alreadyInCart=false; 
    //item represent the each element in the cartItem array
    //product is the parameter which clicked
    cartItems.forEach(item => 
      {
      if(item._id ===product._id){
          console.log(item._id,"item_id");
          console.log(product._id,"product _id");
          console.log(item.count,"count");
          item.count++;
          alreadyInCart=true;
        }
    })
    if(!alreadyInCart){
      cartItems.push({...product ,count:1});//this means to push the fields of product instead of product
      console.log(cartItems,"in add to chart alreadyincart false");
    }
    this.setState({cartItems:cartItems});
    localStorage.setItem("cartItems",JSON.stringify(cartItems));//"cartItems" is the key and cartItems is the value
  }*/

  //state func that used to pass to Filter comp as props
  //func removed , applied now in reducer
//state func that used to pass to Filter comp as props
  //func removed , applied now in Actions
  render() {
    return (
      <Provider store={store}>
      <div className="grid-container">        
        <header>
        <Zoom right cascade>
          <a href="/">React Shopping Cart</a>
        </Zoom>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter></Filter>
              <Products></Products>
            </div>
            <div className="sidebar">
              <Cart createOrder={this.createOrder} />
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
      </Provider>
    );
  }
}

export default App;

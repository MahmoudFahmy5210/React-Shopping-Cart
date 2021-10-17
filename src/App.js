//import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import data from "./data.json"
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from  './components/Cart';
import Zoom from 'react-reveal/Zoom';
import store from "./store";
import { Provider } from 'react-redux';
class App extends Component {
  constructor() {
    super();
    
    this.state = {
      products: data.products,
      cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):
      [],//we have to check the exisestance of the item in local storge before parseing it
      size: "",
      sort: "",
      
    }
  }
  
  createOrder = (order) => {
    alert("Are you sure you need to save this order " + order.name);
    
  };
  removeFromCart=(product)=>{
    const cartItems=this.state.cartItems.slice();
    this.setState({
      cartItems:cartItems.filter(x=> x._id !== product._id)///this will remove the removed product
    });
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=> x._id !== product._id)));
  }
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
  }

  //state func that used to pass to Filter comp as props
  sortProducts = (e) => 
  {
    const sort = e.target.value;
    console.log(e.target.value);
    this.setState((state) => 
    ({
      sort: sort,
      //products now access the filtered producta
      products: this.state.products.slice()
      .sort
      (
        (a, b) =>
          sort === "lowest" ?
          a.price > b.price ?1 : -1 //if a greater than b then 1 which mean change them,-1 no change (arrange lowest)
          :sort === "highest" ?
          a.price < b.price ?1 :-1 //if a less than b then 1 which mean change them,-1 no change (arrange highest)
          : a._id < b._id ?1 : -1
      ),
    })
    );
  };
//state func that used to pass to Filter comp as props
  filterProducts = (e) => {
    console.log(e.target.value);
    //handle the size from the user
    if (e.target.value === "") {
      this.setState({
        size: "",
        products: data.products,
      })
    }
    else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(e.target.value) >= 0),
      })
    }
  }

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
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              >
              </Filter>
              <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems}
              removeFromCart={this.removeFromCart}
              createOrder={this.createOrder} />
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

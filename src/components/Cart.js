import React, { Component } from 'react';
import formatCurrency from '../util';
import Slide from 'react-reveal/Slide';  
import Flip from 'react-reveal/Flip';  
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartAction';
//import Roll from 'react-reveal/Roll';  


 
class Cart extends Component {
    constructor(props){
        super();
        this.state= {
            name:"",
            email:"",
            address:"",
            showCheckOut:false ,
        };
       
    }
   
    //func that handle event as input
    handleInput=(e) =>{
        //set state for each input
        console.log('Name :',[e.target.name]);
        console.log('Value :',e.target.value);
        this.setState({ [e.target.name]:e.target.value})
        
    }
    //func that handle form submit event as input
    createOrder=(e) =>{
        //console.log("Target Email",e.target.email.value);
        //Empty the inputs after subimtited
        e.target.email.value="";
        e.target.name.value="";
        e.target.address.value="";
        this.setState({
            showCheckOut:false
        });
        e.preventDefault();
        const order={
            email:this.state.email,
            name:this.state.name,
            address:this.state.address,
            cartItems:this.props.cartItems 
        };
        this.props.createOrder(order);
        console.log("event.Target",e.target.value);
       
    }
    render() {
        const {cartItems}=this.props;
        console.log(cartItems,"from Cart Cartitems.length");
        //console.log(cartItems,"from Cart Cartitems arr");

        return (
            <div>
                {cartItems.length === 0 ? //means if
                (<div className="cart cart-header">
                    Cart is empty
                </div>)
                :(//means else
                <div className="cart cart-header">
                    You have {" "}{cartItems.length}{" "}in your cart{" "} 
                </div>
                )}
                <div>
                    <div className="cart">
                        <Slide left cascade>
                        
                        <ul className="cart-items">
                            {cartItems.map(item =>(
                            
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}></img>
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count}{" "}
                                        <button className="button" onClick={
                                            ()=>{
                                            this.props.removeFromCart(item);
                                            }
                                            }>
                                            Remove
                                        </button>
                                    </div>     
                                </div>
                            </li>
                            
                            ))}
                        </ul>
                        
                        </Slide>
                    </div>
                    {   cartItems.length !==0 &&(
                    <div>
                        <div className="cart">
                            <div className="total">   
                                <div>Total :{" "}{formatCurrency(cartItems.reduce((accumulator,currentVal)=>accumulator+(currentVal.price*currentVal.count),0))}
                                </div>
                                <button onClick={() =>{
                                this.setState({showCheckOut:true});
                            }} 
                                className="button primary">
                                Proceeds</button>
                            </div>  
                        </div>
                        {this.state.showCheckOut &&(
                        <div className="cart">
                            <form onSubmit={this.createOrder}>
                            <Flip top cascade>
                                <ul className="form-container">
                                    <li>
                                        <label>Email</label>
                                        <input name="email" type="email" required  onChange={this.handleInput}></input>
                                    </li>
                                    <li>
                                        <label>Name</label>
                                        <input name="name" type="text" required onChange={this.handleInput}></input>
                                    </li>
                                    <li>
                                        <label>Address</label>
                                        <input name="address" type="text" required onChange={this.handleInput}></input>
                                    </li>
                                    <li>
                                        <button className="button primary" type="submit">Checkout</button>
                                    </li>
                                </ul>
                                </Flip>
                            </form>
                        </div>   
                        )}
                    </div>
                    )}
            </div>  
        </div>
        );
        
    }
}
export default connect((state )=> ({
    cartItems:state.cart.cartItems,
}),{removeFromCart}
)(Cart);
import React, { Component } from 'react';
import formatCurrency from '../util';
import Slide from 'react-reveal/Slide';  
import Flip from 'react-reveal/Flip';  
import Zoom from 'react-reveal/Zoom';  
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { removeFromCart,clearCart } from '../actions/cartAction';
import { clearOrder,createOrder } from '../actions/orderActions';

//import Roll from 'react-reveal/Roll';  


 
class Cart extends Component {
    constructor(props){
        super(props);
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
        // e.target.email.value="";
        // e.target.name.value="";
        // e.target.address.value="";
        // this.setState({
        //     showCheckOut:false
        // });
        e.preventDefault();
        const order={
            email:this.state.email,
            name:this.state.name,
            address:this.state.address,
            cartItems:this.props.cartItems,
            total:this.props.cartItems.reduce((a,c)=> (a+c.price*c.count),0)
        };
        this.props.createOrder(order);// calling createOrder related to actions
        console.log("event.Target",e.target.value);
    };

    closeModal=()=>{
        this.props.clearOrder();
        this.props.clearCart();
    };
    render() {
        const {cartItems,order}=this.props;
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

                {
                //if there are order do modal
                order && 
                (   
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                <Zoom>
                    <button className="close-modal" onClick={this.closeModal}>x</button>
                    <div className="order-details">
                        <h3 className="success-message">Your order has been placed</h3>
                        <h2>Order {" "} {order._id}</h2>
                        <ul>
                            <li>
                                <div>Name: </div>
                                <div>{order.name}</div>
                            </li>
                            <li>
                                <div>Email: </div>
                                <div>{order.email}</div>
                            </li>
                            <li>
                                <div>Address: </div>
                                <div>{order.address}</div>
                            </li>
                            <li>
                                <div>Date: </div>
                                <div>{order.createdAt}</div>
                            </li>
                            <li>
                                <div>Total: </div>
                                <div>{formatCurrency( order.total )}</div>
                            </li>
                            <li>
                                <div>Cart Items: </div>
                                <div>
                                    {order.cartItems.map((x)=>
                                    (
                                    <div>
                                    {x.count} {" x "} {x.title} 
                                    </div>
                                    )
                                )}
                                </div>
                            </li>
                        </ul>
                    </div>
                </Zoom>
                </Modal>
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
                    {   cartItems.length !== 0 && (
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
    order:state.order.order,
    cartItems:state.cart.cartItems,
}),{removeFromCart,createOrder,clearOrder,clearCart}
)(Cart);
import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from    "react-reveal/Fade"; 
import Zoom from    "react-reveal/Zoom"; 
import Modal from    'react-modal';
import { connect } from "react-redux";
import {fetchProducts} from "../actions/productActions"

class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            product:null
        };
    }
    componentDidMount(){
        this.props.fetchProducts();
      }
    openModal=(product)=>{
        //means make it 
        this.setState({
            product
        })
    }
    closeModal=()=>{
        this.setState({
            product:null
        })
    }

    render() {
        const {product} =this.state;
        //bottom means it comes from bottom , and cascade means comes in order not at the same time
        return (
            
            <div>
                <Fade top cascade>
                { !this.props.products ? <div> <h4> Loading ...</h4> </div> :
                <ul className="products">
                {this.props.products.map(product=>
                (
                    <li key={product.id}>
                        <div className="product">
                            <a href={"#"+product._id} onClick={()=>this.openModal(product)}>
                                <img src={product.image} alt={product.title}></img>
                                <p>{product.title}</p>
                            </a>
                        </div>
                        <div className="product-price">
                            <div> {formatCurrency(product.price)} </div>
                            <button onClick={()=>this.props.addToCart(product)} className="button primary">Add To Cart</button>
                        </div>
                    </li>
                ))}                    
            </ul>

                }
                
                </Fade>
                {product && (
                <Modal isOpen={true} onRequestClose={this.closeModal}>
                    <Zoom>
                        <button className="close-modal" onClick={this.closeModal}>X</button>
                        <div className="product-details">
                            <img src={product.image} alt={product.title}></img>
                            <div className="product-details-descriptions">
                                <p>
                                    <strong>{product.title} </strong>
                                </p>
                                <p>
                                    {product.description}
                                </p>
                                <p>
                                    Available Sizes :{" "}
                                    {product.availableSizes.map((x)=>(
                                        <span>
                                            {" "}
                                            <button className="button">{x}</button>
                                        </span>
                                    ))}
                                </p>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button className="button primary" onClick={()=>{
                                        this.props.addToCart(product);
                                        this.closeModal();
                                    }}> 
                                    Add TO Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
                )}
                
            </div>
        )
    }
}
//connect accept two parameter
//the first one is the func that accept state and return an object that define which part of the states i gonna use
//the second parameter is list of actions
//the connect func itself return another func , the parameter is the name of the comp which we will connect
export default connect((state) =>({products:state.products.items}), {fetchProducts})
(Products);

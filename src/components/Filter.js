import React, { Component } from 'react';
import { connect } from 'react-redux';
import {filterProducts,sortProducts} from '../actions/productActions';

 
class Filter extends Component {
    render() {
        return !this.props.filteredProducts ? (<div>Loading ... </div>) 
        : (

            <div className="filter">
                <div className="filter-result">
                {this.props.filteredProducts.length}{" "}Products</div>
                <div className="filter-sort">
                Order {" "}
                <select value={this.props.sort} onChange={(e)=>this.props.sortProducts(this.props.filteredProducts,e.target.value)}>
                    <option value="latest">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
                </div>
                <div className="filter-size">
                    Filter {" "}
                    <select value={this.props.size} onChange={(e)=>this.props.filterProducts(this.props.products,e.target.value)}>
                        <option value="">All</option> 
                        <option value="XLL">XLL</option> 
                        <option value="S">S</option> 
                        <option value="XL">XL</option> 
                        <option value="M">M</option> 
                        <option value="L">L</option> 
                    </select>
                </div>
            </div>
        )
    }
}
//connect accept two parameter
//the first one is the func that accept state and return an object that define which part of the states i gonna use
//the second parameter is list of actions
//the connect func itself return another func , the parameter is the name of the comp which we will connect
export default connect((state)=>({
    size:state.products.size,
    sort:state.products.sort,
    products:state.products.items, 
    filteredProducts:state.products.filteredItems,
}),
{
    filterProducts,sortProducts
})(Filter);
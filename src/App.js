import React from 'react';
import './index.scss';
import Toolbar from "./Components/Toolbar/Toolbar";
import ModalForm from "./Components/ModalForm/ModalForm";
import Product from "./Components/Product/Product";

import PRODUCTS from "./data/productsData";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCategory: "all",
            categories: this.getCategory(PRODUCTS),
            products: PRODUCTS,
            modalOpen: false,
            productDetails: {
                image: "",
                name: "",
                price: "",
                dateCreated: "",
                category: "",
                description: "",
            },
        };
        this.setCategory = this.setCategory.bind(this);
        this.toggleModalForm = this.toggleModalForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCategory(this.state.products);
        this.addProduct = this.addProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    addProduct(product) {
        let date = new Date();
        product.id = this.state.products.length;
        product.id++;
        product.dateCreated = date.toLocaleDateString();
        let products = [...this.state.products, product];
        this.setState({
            products : products
        });
        console.log(this.state.products)
    };

    deleteProduct(id) {
        let products = this.state.products.filter(product => {
            return product.id !== id;
        });
        this.setState({
            products: products
        })
    };

    ProductList(products) {
        return (
            <div className="row mt-3">
                {products.map((product) =>
                    <Product key={product.id}
                             product={product}
                             deleteProduct={this.deleteProduct}
                    />
                )}
            </div>
        )
    }

    sort(products, category) {
        const product_items = products.filter(item => {
                return item.category === category
            }
        );
        return category === "all" ? products : product_items;
    }

    getCategory(products) {
        const unique = (x, i, a) => a.indexOf(x) === i;
        const product_categories = products.map(prod => prod.category).filter(
            unique
        );
        product_categories.push("all");
        product_categories.sort();
        return product_categories;
    }

    setCategory(category) {
        this.setState({
            displayCategory: category,
        });
    }

    toggleModalForm() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    handleChange(event) {
        let productData = this.state.productDetails;
        Object.assign(productData, {[event.target.name]: event.target.value});
        this.setState({
            product: productData
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        this.addProduct(this.state.productDetails);
        this.setState({
            modalOpen: false,
        });

    }

    render() {
        return (
            <div className="App">
                <Toolbar categories={this.state.categories}
                         setCategory={(e) => this.setCategory(e)}
                         addProduct={() => this.toggleModalForm()}
                />
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="mb-3">Product Catalog</h2>
                        </div>
                    </div>
                    {this.ProductList(this.sort(this.state.products, this.state.displayCategory))}
                </div>

                {this.state.modalOpen && <ModalForm
                    isRequired={false}
                    product={this.state.productDetails}
                    onClose={this.toggleModalForm}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />}
            </div>
        );
    }
}

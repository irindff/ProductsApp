import React from 'react'
import './styles.scss'
import ModalDetails from "../ModalDetails/ModalDetails";
import ModalForm from "../ModalForm/ModalForm";
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            isEdit: false,
            id:props.id,
            productData:{},
            product: {
                id:props.product.id,
                image: props.product.image,
                name: props.product.name,
                price: props.product.price,
                category: props.product.category,
                description: props.product.description,
            }

        };
        this.toggleDetails = this.toggleDetails.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    toggleDetails() {
        this.setState({
            modalOpen: !this.state.modalOpen,
            isEdit: false
        });
    }

    onEditClick() {
        this.setState(({isEdit}) => ({
            isEdit: !isEdit,
        }))
    }

    handleChange(event) {
        let productData =this.state.productData;
        Object.assign(productData, this.state.product);
        Object.assign(productData, {[event.target.name]:event.target.value});
        this.setState({
            productData: productData
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            product: this.state.productData
        });
        this.toggleDetails();

    }

    deleteProduct(id){
        this.props.deleteProduct(id)
    }
    render() {
        return (
            <div className="col-sm-6 col-md-3">
                <div className="product">
                    <div className='test' style={{backgroundImage: `url(${this.state.product.image})`}}/>
                    <div className="image_overlay"/>
                    <div className="view_details" onClick={this.toggleDetails}>
                        view details
                    </div>
                    <div className="stats">
                        <div className="stats-container">
                            <div className="product_name">{this.state.product.name}</div>
                            <div className="product_price">{this.state.product.price}</div>
                            <div className="btn btn-outline-danger" onClick={() => this.deleteProduct(this.state.product.id)}>
                                Delete
                            </div>
                        </div>

                    </div>
                    {this.state.modalOpen && <div className="productInfo">
                        {!this.state.isEdit &&  <ModalDetails product={this.state.product}
                                                              onUpdate={this.onEditClick}
                                                              onClose={ this.toggleDetails}
                        />}
                        {this.state.isEdit &&  <ModalForm product={this.state.product}
                                                          onClose={this.toggleDetails}
                                                          handleChange={this.handleChange}
                                                          handleSubmit={this.handleSubmit}
                                                          isRequired={false}
                                                          disabled={true}
                        />}
                    </div>}
                </div>
                </div>



        );
    }
}

export default Product

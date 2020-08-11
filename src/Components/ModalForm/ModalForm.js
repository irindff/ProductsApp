import React from 'react'
import './styles.scss'


class ModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRequired: this.props.isRequired ? this.props.isRequired : true,
            disabled : false,
            image: props.product.image,
            name: props.product.name,
            price: props.product.price,
            category: props.product.category,
            description: props.product.description,
        };
console.log(props)
        this.toggleDetails = this.toggleDetails.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleDetails() {
        this.props.onClose()
    }


    handleChange(event) {
        this.props.handleChange(event);
        if(event.target.name === "name" && event.target.value.length <= 0){
            this.setState({
                disabled : true
            });
        }else if (event.target.name === "price" && event.target.value <= 0){
            this.setState({
                disabled : true
            });
        }else if ((event.target.name === "name" && event.target.value > 0) && (event.target.name === "price" && event.target.value > 0)){
            this.setState({
                disabled : false
            });
        }
        else {
            this.setState({
                disabled : false
            });
        }
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.handleSubmit(event)
    }

    render() {
        return (
            <div className='modalForm'>
                <div className="card mb-3">
                    <form className="row no-gutters w-75" onSubmit={this.handleSubmit}>
                        <h3 className='m-auto'>Product Details</h3>
                        <div className="col-md-12 p-1">
                            <div className="card-body">
                                <div className="card-title p-1">
                                    <input className="w-75 m-auto" maxLength="30"
                                           name="name"
                                           placeholder="Product Name"
                                           type="text"
                                           onChange={this.handleChange}
                                           value={this.state.name}
                                    />
                                </div>
                                <div className="card-text p-1">
                                    <textarea className="w-75  m-auto" maxLength="200"
                                              name="description"
                                              placeholder="Product Description"
                                              onChange={this.handleChange}
                                              value={this.state.description}
                                    />
                                </div>
                                <div className="card-text p-1">
                                    <input className="w-75 m-auto" min="1"
                                           name="price"
                                           placeholder="Product Price"
                                           type="number"
                                           onChange={this.handleChange}
                                           value={this.state.price}
                                    />
                                </div>
                                <div className="card-text p-1">
                                    <input className="w-75 m-auto"
                                           name="image"
                                           placeholder="Image Url"
                                           type="text"
                                           onChange={this.handleChange}
                                           value={this.state.image}
                                    />
                                </div>
                                <div className="card-text p-1">
                                    <input className="w-75 m-auto"
                                           name="category"
                                           placeholder="Category"
                                           type="text"
                                           onChange={this.handleChange}
                                           value={this.state.category}
                                    />
                                </div>
                                <button type="submit" className="btn  btn-outline-primary " disabled={this.state.disabled}>Save
                                </button>
                                <button className="btn  btn-outline-primary "  onClick={this.toggleDetails}>Close</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ModalForm


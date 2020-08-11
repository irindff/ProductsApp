import React from 'react'
import './styles.scss'


class ModalDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            isEdit: true,
            image: props.product.image,
            name: props.product.name,
            price: props.product.price,
            category: props.product.category,
            description: props.product.description,
        };
        this.toggleDetails = this.toggleDetails.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    toggleDetails() {
        this.props.onClose()
    }

    onEditClick() {
        this.props.onUpdate()
    }


    render() {
        return (
            <div className="card mb-3 w-75">
                <div className="row no-gutters align-items-center">
                    <div className="col-md-4 ">
                        <img src={this.state.image} className="card-img" alt={this.state.name}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title "><span className="text-nowrap>" >Product Name:&nbsp;</span>{this.state.name}</h3>
                            <div className="card-body m-1">
                            <div className="card-text text-left p-1 "><span className="text-nowrap>" >Description:&nbsp;</span>{this.state.description}</div>
                            <div className="card-text text-left p-1"><span className="text-nowrap>" >Price:&nbsp;</span> {this.state.price}</div>
                            </div>
                            <div className='card-body'>
                            <div className="btn  btn-outline-primary m-1" onClick={this.onEditClick}>Update</div>
                            <div className="btn  btn-outline-primary" onClick={this.toggleDetails}>Close</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ModalDetails


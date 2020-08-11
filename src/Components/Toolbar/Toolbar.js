import React from 'react';
import './styles.scss';

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);

    }
    sort(type) {
        this.props.setCategory(type)
    }
addProduct(){
     this.props.addProduct()
}
    render() {
        return (
            <div className="toolbar">
                <h3 className='d-inline-block'> Sort by: </h3>
                {this.props.categories.map((category, id) =>
                    <button key={id} className="btn btn-outline-primary m-1" onClick={(event) => this.sort(category)}>
                        {category}
                    </button>
                )}
                <button className="btn btn-danger float-right" onClick={(event) => this.addProduct()}>
                Add Product
                </button>
            </div>
        );
    }
}
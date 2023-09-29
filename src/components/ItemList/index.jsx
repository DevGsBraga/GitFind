import React from "react";
import './list.css'

const ItemList = ({title, description}) => {
    return (
        <div className="item-lista">
            <strong>{title}</strong>
            <p>{description}</p>
            <hr />
        </div>

    );
}



export default ItemList;






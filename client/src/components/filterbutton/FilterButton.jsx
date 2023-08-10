import React from "react";

import "./filterbutton.css";

const FilterButton = ({handleClick}) => {

    return (
        <div onClick={() => handleClick()} className="filter__button">
            <i className="bx bx-filter" />
            <p>Bộ lọc</p>
        </div>
    )
}

export default FilterButton;
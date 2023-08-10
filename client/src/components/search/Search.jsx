import React, { useState } from "react";

import "./search.css"

const Search = (props) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
           props.handleEvent();
        }
      }
    return (
        <div className="search">
            <input type="text" value={props.value} onChange={props.onChange?(e)=> props.onChange(e):null} onKeyDown={handleKeyPress} placeholder={props.placeholder} />
            <i onClick={props.handleEvent ? props.handleEvent:null} className="bx bx-search" />
        </div>
    )
}
 


export default Search;
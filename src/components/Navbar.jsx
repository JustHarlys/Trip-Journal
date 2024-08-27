import React, {useState} from 'react';


export default function Navbar({addTrip, handleClick }){


    return(
        <>
        <div className='navbar'>
        <p>My travel journal</p> 
        <ul className='nav-items'>
            <button onClick={handleClick}>{addTrip ? "Close Add Trip" : "Add Trip"}</button>
        </ul>
        </div>
        </>
    )
}
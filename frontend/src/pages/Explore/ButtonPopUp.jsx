import React from 'react'
import "./ButtonPopUp.css"

export default function ButtonPopUp({ title, onClick }) {
    return (
        <button className='common-btn' onClick={onClick}>{title}</button>
    )
}

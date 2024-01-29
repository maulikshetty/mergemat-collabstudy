import React from 'react'
import './style.css'
import Attach from '../../imgs/attachment.svg'
import Picture from '../../imgs/picture.svg'
import Send from '../../imgs/send.svg'

const InputD = () => {
    return (
        <div className='input'>
            <input type="text" placeholder="Type your message..." />
            <div className="icons">
                <img src={Attach} alt="Attach" className="icon" />
                <input type="file" style={{ display: "none" }} id="file" />
                <label htmlFor="file">
                    <img src={Picture} alt="Picture" className="icon" />
                </label>
            </div>
            <button className="send-button">Send</button>

        </div>

    )
}

export default InputD

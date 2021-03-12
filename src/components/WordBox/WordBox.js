import React from 'react';
import stein from '../../images/stein.png'
import './WordBox.css'

export default function WordBox(props) {
    return (
        <div className='WordBox'>
            <div className='centered'>
                <img src={stein} alt='' />
                <h4>{props.original}</h4>
            </div>
            <p>{`correct answer count: ${props.correct_count}`}</p>
            <p>{`incorrect answer count: ${props.incorrect_count}`}</p>
        </div>
    )
}
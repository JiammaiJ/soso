import React, { useState } from 'react'

import style from './battery.module.css'
const Battery = () => {
    const [power] = useState(88.8)
    return (
        <div className={style.g_container}>
            <h1>C<br/>S<br/>S<br/>充电器</h1>
            <div className={style.g_number}>{power}%</div>
            <div className={style.g_contrast}>
                <div className={style.g_circle}></div>
                <ul className={style.g_bubbles}>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

export default Battery
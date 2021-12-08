import React, { useState } from 'react'
import Copyright from '../../../features/Copyright'
import Title from '../../../features/Title'
import CalculatorHistory from '../CalculatorHistory'
import './index.css'

const CalculatorNav: React.FC = () => {
    const [navState, setNavState] = useState(false)

    const handleOnClick = () => setNavState(!navState)

    return (
        <nav>
            <button className="nav-button" onClick={handleOnClick}>
                &#8801;
            </button>
            <section className={`nav-content ${navState === true ? "open" : "closed"}`}>
                <Title />
                <CalculatorHistory />
                <Copyright />
            </section>
        </nav>
    )
}

export default CalculatorNav
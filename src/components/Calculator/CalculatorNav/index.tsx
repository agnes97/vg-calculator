import React, { useState } from 'react'
import Copyright from '../../Copyright'
import Title from '../../Title'
import './index.css'

const CalculatorNav: React.FC = () => {
    const [navState, setNavState] = useState(false)

    const handleOnClick = () => setNavState(!navState)

    return (
        <nav>
            <button className="header-button" onClick={handleOnClick}>
                &#8801;
            </button>
            <section className={`nav-content ${navState === true ? "open" : "closed"}`}>
                {/* TODO: Refactor to include only one button! */}
                <button className="header-button" onClick={handleOnClick}>
                    &#x2715;
                </button>
                <Title />
                <div className="counting-history">
                    <h3>History:</h3>
                    <ul>
                        {/* TODO: MAP <LI> FROM HISTORY */}
                        <li>3 + 1 = 4</li> 
                        <li>3 + 1 = 4</li> 
                        <li>3 + 1 = 4</li> 
                        <li>3 + 1 = 4</li> 
                    </ul>
                </div>
                <Copyright />
            </section>
        </nav>
    )
}

export default CalculatorNav
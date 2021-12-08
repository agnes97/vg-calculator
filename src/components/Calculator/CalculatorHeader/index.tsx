import React, { useState } from 'react'
import CalculatorNav from '../CalculatorNav'
import { State } from '../types'
import './index.css'

type Props= {
    headerText: string
    currentOperand: State["currentOperand"]
    previousOperand: State["previousOperand"]
    operation: State["operation"]
}

const CalculatorHeader: React.FC<Props> = ({ headerText, currentOperand, previousOperand, operation }) => {
    const [navState, setNavState] = useState(false)

    const handleNavStateOnClick = () => setNavState(!navState)
    
    return (    
        <header className="calculator__header">
            {/* TODO: Turn button to cross for closing nav! */}
            <button className="nav-button" onClick={handleNavStateOnClick}>
                &#8801;
            </button>
            <CalculatorNav navState={navState} />
            
            <section className="calculator__header__content">
                <p>
                    {currentOperand || previousOperand
                        ? `${previousOperand ?? ''} ${operation ?? ''} ${currentOperand ?? ''}`
                        : headerText}
                </p>
            </section>
        </header>
    )
}

export default CalculatorHeader
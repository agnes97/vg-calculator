import React from 'react'
import { State } from '../types'
import './index.css'

type Props= {
    headerText: string
    currentOperand: State["currentOperand"]
    previousOperand: State["previousOperand"]
    operation: State["operation"]
    lastResult: State["lastResult"]
}

const CalculatorHeader: React.FC<Props> = ({ headerText, currentOperand, previousOperand, operation, lastResult }) => {
    return (    
        <header className="calculator__header">           
            <section className="calculator__header__content">
                <p>
                    {lastResult ?? <br/>}
                </p>
                <p>
                    {currentOperand || previousOperand
                        ? `${previousOperand?.toLocaleString() ?? ''} ${operation ?? ''} ${currentOperand?.toLocaleString() ?? ''}`
                        : headerText}
                </p>
            </section>
        </header>
    )
}

export default CalculatorHeader
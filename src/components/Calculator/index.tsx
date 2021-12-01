import React from 'react'
import { fillButtons } from '../../services/calculatorData'
import './index.css'

const Calculator: React.FC = () => (
    <section className="calculator">
        <header className="calculator__header">
            <p>HLAVIČKA</p>
        </header>
        {fillButtons().map((character: string, index: number) => (
            <button
                key={index}
                className={`
                        calculator__button
                        ${!isNaN(+character) ? "calculator__button--number" : "calculator__button--sign"}
                    `}
            >
                {character}
            </button>
        ))}
    </section>
)

export default Calculator
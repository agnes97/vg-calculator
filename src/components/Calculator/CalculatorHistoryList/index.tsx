import React from 'react'
import './index.css'

type Props = {
    currentHistory: string[]
}

const CalculatorHistoryList: React.FC<Props> = ({ currentHistory }) => {
    const historyIsEmpty = currentHistory.length === 0
    const emptyHistoryMessage = "There is no history yet. :("

    return (
        <div className="calculator-history">
            <h3>History:</h3>
            {!historyIsEmpty
                ? <ul>
                    {currentHistory.map((operation, index) => (
                        <li key={index}>{operation}</li>
                    ))}
                </ul>
                : <p>{emptyHistoryMessage}</p>
            }
        </div>
    )
}

export default CalculatorHistoryList
import type { FC } from 'react'
import './index.css'

type Props = {
  currentHistory: string[]
}

const CalculatorHistoryList: FC<Props> = ({ currentHistory }) => {
  const isHistoryIsEmpty = currentHistory.length === 0
  const emptyHistoryMessage = 'There is no history yet. :('

  return (
    <div className="calculator-history">
      <h3>History:</h3>
      {!isHistoryIsEmpty
        ? (
          <ul>
            {currentHistory.map(operation =>
              <li key={operation}>{operation}</li>)}
          </ul>
        )
        : <p>{emptyHistoryMessage}</p>
      }
    </div>
  )
}

export default CalculatorHistoryList

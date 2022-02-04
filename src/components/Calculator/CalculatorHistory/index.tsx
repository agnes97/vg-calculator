import type { FC, Dispatch } from 'react'

import Copyright from '../../Copyright'
import Title from '../../Title'
import CalculatorHistoryList from '../CalculatorHistoryList'
import './index.css'

type HistoryState = {
  historyState: boolean
}

type Props = {
  historyState: HistoryState['historyState']
  setHistoryState: Dispatch<HistoryState['historyState']>
  currentHistory: string[]
}

const CalculatorHistory: FC<Props> = ({ currentHistory, historyState, setHistoryState }) => {
  const handleClosing = () => setHistoryState(false)

  return (
    <nav className={`nav-content ${historyState ? 'open' : 'closed'}`}>
      <header>
        <button type='button' className="nav-button" onClick={handleClosing}>
          &#10007;
        </button>
        <Title />
      </header>
      <CalculatorHistoryList currentHistory={currentHistory} />
      <Copyright />
    </nav>
  )
}

export default CalculatorHistory

import React, { Dispatch } from 'react'
import Copyright from '../../Copyright'
import Title from '../../Title'
import CalculatorHistoryList from '../CalculatorHistoryList'
import './index.css'

type HistoryState = {
    historyState: boolean
}

type Props = {
    historyState: HistoryState["historyState"]
    setHistoryState: Dispatch<HistoryState["historyState"]>
}

const CalculatorHistory: React.FC<Props> = ({ historyState, setHistoryState }) => {   
    const handleClosing = () => setHistoryState(false)

    return (
        <nav className={`nav-content ${historyState === true ? "open" : "closed"}`}>
            <header>
                <Title />
                <button className="nav-button" onClick={handleClosing}>
                    &#10007;
                </button>
            </header>
            <CalculatorHistoryList />
            <Copyright />
        </nav>
    )
}

export default CalculatorHistory
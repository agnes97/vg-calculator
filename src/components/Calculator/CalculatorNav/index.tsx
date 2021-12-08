import React from 'react'
import Copyright from '../../Copyright'
import Title from '../../Title'
import CalculatorHistory from '../CalculatorHistory'
import './index.css'

type Props = {
    navState: boolean
}

const CalculatorNav: React.FC<Props> = ({ navState }) => (
    <nav className={`nav-content ${navState === true ? "open" : "closed"}`}>
        <section>
            <Title />
            <CalculatorHistory />
            <Copyright />
        </section>
    </nav>
)

export default CalculatorNav
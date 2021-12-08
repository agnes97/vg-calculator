import React from 'react'
import Copyright from '../../../features/Copyright'
import Title from '../../../features/Title'
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
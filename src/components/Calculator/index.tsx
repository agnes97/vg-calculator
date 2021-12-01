import React, { useReducer } from 'react'
import { fillButtons } from '../../services/calculatorData'
import Button from './CalculatorButton'
import './index.css'

export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: "choose-operation",
    CLEAR: "clear",
    DELETE_DIGIT: "delete-digit",
    EVALUATE: "evaluate",
}

export type State = {
    currentOperand?: string
    previousOperand?: string
    operation?: string
}

export type Action = {
    type: string
    payload: {value: string}
}

const Calculator: React.FC = () => {
    const reducer = (state: State, { type, payload }: Action): State => {
        switch (type) {
            case ACTIONS.ADD_DIGIT: 
                return {
                    ...state,
                    currentOperand: `${state.currentOperand || ""}${payload.value}`,
                }
            default:
                return state
        }
    }

    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
        reducer,
        {}
    )

    return (
        <section className="calculator">
            <header className="calculator__header">
                <p>
                    {currentOperand
                        ? `${previousOperand ?? ''} ${operation ?? ''} ${currentOperand ?? ''}`
                        : "Start counting, baby! 💛"
                    }
                </p>
            </header>
            {fillButtons().map((character: string, index: number) => (
                <Button
                    key={index}
                    value={character}
                    className={`
                        calculator__button
                        ${!isNaN(+character) ? "calculator__button--number" : "calculator__button--sign"}
                    `}
                    dispatch={dispatch}                
                />
            ))}
        </section>
    )
}

export default Calculator
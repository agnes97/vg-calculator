import React, { useReducer, useState } from 'react'
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
    currentOperand?: string | number | null
    previousOperand?: string | number | null
    operation?: string | number | null
}

export type Action = {
    type: string
    payload: {value: string | number}
}

const Calculator: React.FC = () => {
    const [headerText, setHeaderText] = useState<string>("Start counting, baby! 💛")

    const reducer = (state: State, { type, payload }: Action): State => {
        switch (type) {
            // WRITE DIGITS
            case ACTIONS.ADD_DIGIT: 
                if (payload.value === 0 && state.currentOperand === "0") { 
                    return state // Don't repeat 0 if it's the first character!
                }
                if (payload.value === "." && state.currentOperand?.toString().includes(".")) { 
                    return state // Don't include more than one "." per operand!
                }
                return {
                    ...state,
                    currentOperand: `${state.currentOperand || ""}${payload.value}`,
                }

            // WRITE SIGNS
            case ACTIONS.CHOOSE_OPERATION:
                return {
                    ...state,
                    previousOperand: state.currentOperand,
                    operation: payload.value,
                    currentOperand: null,
                }

            // CLEAR HISTORY
            case ACTIONS.CLEAR:
                setHeaderText("Anything else? 💭")
                return {}

            // DEFAULT RETURN
            default:
                return state
        }
    }

    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
        reducer,
        {}
    )

    // DETERMINE VALUE TYPE (ACTION)
    const determineAction = (character: Action["payload"]["value"]) => {
        if (character === "DEL") return ACTIONS.CLEAR
        if (character === ".") return ACTIONS.ADD_DIGIT
        if (!isNaN(+character)) return ACTIONS.ADD_DIGIT
        if (isNaN(+character)) return ACTIONS.CHOOSE_OPERATION
    }
    
    return (
        <section className="calculator">
            <header className="calculator__header">
                <p>
                    {currentOperand || previousOperand
                        ? `${previousOperand ?? ''} ${operation ?? ''} ${currentOperand ?? ''}`
                        : headerText
                    }
                </p>
            </header>
            {fillButtons().map((value: Action["payload"]["value"], index: number) => (
                <Button
                    key={index}
                    value={value}
                    className={`
                        calculator__button
                        ${!isNaN(+value) ? "calculator__button--number" : "calculator__button--sign"}
                    `}
                    dispatch={dispatch} 
                    actionType={determineAction(value)}                
                />
            ))}
        </section>
    )
}

export default Calculator
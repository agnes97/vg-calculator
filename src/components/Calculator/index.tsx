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
    currentOperand?: string | null
    previousOperand?: string | null
    operation?: string | null
}

export type Action = {
    type: string
    payload: {value: string}
}

const Calculator: React.FC = () => {
    const [headerText, setHeaderText] = useState<string>("Start counting, baby! 💛")

    const reducer = (state: State, { type, payload }: Action): State => {
        switch (type) {
            // WRITE DIGITS
            case ACTIONS.ADD_DIGIT: 
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
    const determineAction = (character: string) => {
        if (character === "DEL") return ACTIONS.CLEAR
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
            {fillButtons().map((character: string, index: number) => (
                <Button
                    key={index}
                    value={character}
                    className={`
                        calculator__button
                        ${!isNaN(+character) ? "calculator__button--number" : "calculator__button--sign"}
                    `}
                    dispatch={dispatch} 
                    actionType={determineAction(character)}                
                />
            ))}
        </section>
    )
}

export default Calculator
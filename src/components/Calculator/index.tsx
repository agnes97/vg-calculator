import React, { useReducer, useState } from 'react'
import { fillButtons } from '../../services/calculatorData'
import Button from './CalculatorButton'
import './index.css'
import { Action, State } from './types'

export enum ACTIONS {
    ADD_DIGIT,
    CHOOSE_OPERATION,
    CLEAR,
    DELETE_DIGIT,
    EVALUATE,
}

const Calculator: React.FC = () => {
    const [headerText, setHeaderText] = useState<string>("Start counting, baby! 💛")

    // DETERMINE VALUE TYPE (ACTION)
    const determineAction = (character: Action["payload"]["value"]) => {
        if (character === "DEL") return ACTIONS.CLEAR
        if (character === "=") return ACTIONS.EVALUATE
        if (character === ".") return ACTIONS.ADD_DIGIT
        if (!isNaN(+character)) return ACTIONS.ADD_DIGIT
        if (isNaN(+character)) return ACTIONS.CHOOSE_OPERATION
        else return null
    }

    // EVALUATE CALCULATOR OPERATIONS ON "="
    const evaluate = ({ operation, previousOperand, currentOperand}: State) => {
        const leftSide = Number(previousOperand)
        const rightSide = Number(currentOperand)

        if (operation === "+") { return `VÝSLEDEK: ${leftSide + rightSide}` }
        if (operation === "-") { return `VÝSLEDEK: ${leftSide - rightSide}` }
        if (operation === "*") { return `VÝSLEDEK: ${leftSide * rightSide}` }
        if (operation === "÷") { return `VÝSLEDEK: ${leftSide / rightSide}` }
    }
    
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

                if (state.overwrite) {
                    return {
                      ...state,
                      currentOperand: payload.value,
                      overwrite: false, // Star new operation after evaluating previous one
                    }
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

            // EVALUATE OPERATION
            case ACTIONS.EVALUATE:
                if (
                    state.previousOperand == null ||
                    state.operation === null ||
                    state.currentOperand === null
                ) { 
                    return state                  
                }

                return {
                    ...state,
                    overwrite: true,
                    previousOperand: null,
                    operation: null,
                    currentOperand: evaluate(state)
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
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { fillButtons } from '../../services/calculatorData'
import Button from './CalculatorButton'
import './index.css'
import { Action, State } from './types'
import CalculatorHeader from './CalculatorHeader'
import CalculatorHistory from './CalculatorHistory'

export enum ACTIONS {
    ADD_DIGIT,
    CHOOSE_OPERATION,
    CLEAR,
    DELETE_DIGIT,
    EVALUATE,
    OPEN_HISTORY
}

const Calculator: React.FC = () => {
    const [headerText, setHeaderText] = useState<string>("Start counting, baby! 💛")
    const [historyState, setHistoryState] = useState(false)
    const [currentHistory, setCurrentHistory] = useState<string[]>([])

    const fillResultHistory = ( currentHistory: string[], lastResult: string) => {
        const newHistory = [...currentHistory, lastResult]
        setCurrentHistory(newHistory)
    }

    // DETERMINE VALUE TYPE (ACTION)
    const determineAction = (character: Action["payload"]["value"]) => {
        if (character === "↻") return ACTIONS.OPEN_HISTORY
        if (character === "⇚") return ACTIONS.DELETE_DIGIT // EDIT TO ONLY DELETE ONE DIGIT
        if (character === "⦻") return ACTIONS.CLEAR
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

        if (operation === "+") { return (leftSide + rightSide).toLocaleString() }
        if (operation === "-") { return (leftSide - rightSide).toLocaleString() }
        if (operation === "*") { return (leftSide * rightSide).toLocaleString() }
        if (operation === "÷") { return (leftSide / rightSide).toLocaleString() }
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
                    currentOperand: evaluate(state),
                    lastResult: `${state.previousOperand} ${state.operation} ${state.currentOperand} = ${evaluate(state)}`,
                    history: fillResultHistory(currentHistory, `${state.previousOperand} ${state.operation} ${state.currentOperand} = ${evaluate(state)}`),
                }

            case ACTIONS.DELETE_DIGIT: 
                if (state.currentOperand == null) return state
                if (state.currentOperand.toString().length === 1) {
                    return { 
                        ...state, 
                        currentOperand: null 
                    }
                }

                return {
                    ...state,
                    currentOperand: state.currentOperand.toString().slice(0, -1),
                }

            // CLEAR HISTORY
            case ACTIONS.CLEAR:
                setHeaderText("Anything else? 💭")
                return {}

            // OPEN HISTORY
            case ACTIONS.OPEN_HISTORY:
                setHistoryState(true) // Open Calculator History
                setHeaderText("Anything else? 💭")
                return {}

            // DEFAULT RETURN
            default:
                return state
        }
    }

    const [{ currentOperand, previousOperand, operation, lastResult }, dispatch] = useReducer(
        reducer,
        {}
    )

    const recogniseKey = useCallback((key: string) => {
        // TODO: Recognise "=" with enter and "÷" with "/" and "DEL" with "delete"
        const recognisedValues = fillButtons().map((value) => value.toString())

        if (recognisedValues.includes(key)) {
            dispatch({ type: determineAction(key), payload: { value: key } })
        }
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', (e) => recogniseKey(e.key))
    }, [recogniseKey])
    
    return (
        <section className="calculator">
            <CalculatorHeader 
                headerText={headerText}
                currentOperand={currentOperand}
                previousOperand={previousOperand}
                operation={operation} 
                lastResult={lastResult}            
            />
            <CalculatorHistory historyState={historyState} setHistoryState={setHistoryState} currentHistory={currentHistory} />
            {fillButtons().map((value: Action["payload"]["value"], index: number) => (
                <Button
                    key={index}
                    value={value}
                    className={`
                        calculator__button
                        ${!isNaN(+value) ? "calculator__button--number" : "calculator__button--sign"}
                        ${value === "=" ? "span-2-columns" : ""}
                    `}
                    dispatch={dispatch} 
                    actionType={determineAction(value)}                
                />
            ))}
        </section>
    )
}

export default Calculator
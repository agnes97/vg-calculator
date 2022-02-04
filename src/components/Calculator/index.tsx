// eslint-disable-next-line no-warning-comments
// TODO: Type problem with template-expressions >>
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import type { FC } from 'react'
import { useCallback, useEffect, useReducer, useState } from 'react'

import Button from './CalculatorButton'
import './index.css'
import CalculatorHeader from './CalculatorHeader'
import CalculatorHistory from './CalculatorHistory'
import type { Action, State } from './types'

import { fillButtons } from '../../services/calculatorData'

export enum ACTIONS {
  ADD_DIGIT,
  CHOOSE_OPERATION,
  CLEAR,
  DELETE_DIGIT,
  EVALUATE,
  OPEN_HISTORY,
}

const Calculator: FC = () => {
  const [headerText, setHeaderText] = useState<string>('Start counting, baby! 💛')
  const [hasPreviousOperations, setPreviousOperations] = useState(false)
  const [currentHistory, setCurrentHistory] = useState<string[]>([])
  const fillResultHistory = (currentHistory: string[], lastResult: string) => {
    const newHistory = [...currentHistory, lastResult]
    setCurrentHistory(newHistory)
  }

  // DETERMINE VALUE TYPE (ACTION)
  const determineAction = (character: Action['payload']['value']) => {
    if (character === '↻') {
      return ACTIONS.OPEN_HISTORY
    }
    if (character === '⇚') {
      return ACTIONS.DELETE_DIGIT
    }
    if (character === '⦻') {
      return ACTIONS.CLEAR
    }
    if (character === '=') {
      return ACTIONS.EVALUATE
    }
    if (character === '.') {
      return ACTIONS.ADD_DIGIT
    }
    if (!isNaN(Number(character))) {
      return ACTIONS.ADD_DIGIT
    }
    if (isNaN(Number(character))) {
      return ACTIONS.CHOOSE_OPERATION
    }
    return null
  }

  // EVALUATE CALCULATOR OPERATIONS ON "="
  const evaluate = ({ operation, previousOperand, currentOperand }: State) => {
    const leftSide = Number(previousOperand)
    const rightSide = Number(currentOperand)
    if (operation === '+') {
      return (leftSide + rightSide).toLocaleString()
    }
    if (operation === '-') {
      return (leftSide - rightSide).toLocaleString()
    }
    if (operation === '*') {
      return (leftSide * rightSide).toLocaleString()
    }
    if (operation === '÷') {
      return (leftSide / rightSide).toLocaleString()
    }
    return null
  }
  const reducer = (state: State, { type, payload }: Action): State => {
    switch (type) {
      // WRITE DIGITS
      case ACTIONS.ADD_DIGIT:
        if (payload.value === 0 && state.currentOperand === '0') {
          return state
        }
        if (
          payload.value === '.'
          && state.currentOperand?.toString().includes('.')
        ) {
          return state
        }

        if (state.overwrite) {
          return {
            ...state,
            currentOperand: payload.value,
            // Star new operation after evaluating previous one
            overwrite: false,
          }
        }

        return {
          ...state,
          currentOperand: `${state.currentOperand ?? ''}${payload.value}`,
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
          state.previousOperand === null
          || state.operation === null
          || state.currentOperand === null
        ) {
          return state
        }

        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: evaluate(state),
          lastResult: `${state.previousOperand} ${state.operation} ${
            state.currentOperand
          } = ${evaluate(state)}`,
          history: fillResultHistory(
            currentHistory,
            `${state.previousOperand} ${state.operation} ${
              state.currentOperand
            } = ${evaluate(state)}`,
          ),
        }

      case ACTIONS.DELETE_DIGIT:
        if (state.currentOperand === null) {
          return state
        }
        if (state.currentOperand?.toString().length === 1) {
          return {
            ...state,
            currentOperand: null,
          }
        }

        return {
          ...state,
          currentOperand: state.currentOperand?.toString().slice(0, -1),
        }

      // CLEAR HISTORY
      case ACTIONS.CLEAR:
        setHeaderText('Anything else? 💭')
        return {}

      // OPEN HISTORY
      case ACTIONS.OPEN_HISTORY:
        // Open Calculator History
        setPreviousOperations(true)
        setHeaderText('Anything else? 💭')
        return {}

      // DEFAULT RETURN
      default:
        return state
    }
  }

  // eslint-disable-next-line no-warning-comments
  // TODO: Recognise "=" with enter and "÷" with "/" and "DEL" with "delete"

  const [{ currentOperand, previousOperand, operation, lastResult }, dispatch]
    = useReducer(reducer, {})
  const recogniseKey = useCallback((key: string) => {
    const recognisedValues = fillButtons().map(value => value.toString())
    if (recognisedValues.includes(key)) {
      dispatch({ type: determineAction(key), payload: { value: key } })
    }
  }, [])
  useEffect(() => {
    document.addEventListener('keydown', event => recogniseKey(event.key))
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
      <CalculatorHistory
        historyState={hasPreviousOperations}
        setHistoryState={setPreviousOperations}
        currentHistory={currentHistory}
      />
      {fillButtons().map((value: Action['payload']['value']) => (
        <Button
          key={value}
          value={value}
          className={`
                        calculator__button
                        ${
        !isNaN(Number(value))
          ? 'calculator__button--number'
          : 'calculator__button--sign'
        }
                        ${value === '=' ? 'span-2-columns' : ''}
                    `}
          dispatch={dispatch}
          actionType={determineAction(value)}
        />
      ))}
    </section>
  )
}

export default Calculator

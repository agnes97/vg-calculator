import { ACTIONS } from "."

type StateOperandType = string | number | null | (() => void) | void

export type State = {
    currentOperand?: StateOperandType
    previousOperand?: StateOperandType
    operation?: StateOperandType
    overwrite?: boolean
}

export type Action = {
    type: ACTIONS | null
    payload: {value: string | number}
}
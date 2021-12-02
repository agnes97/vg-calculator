import { ACTIONS } from "."

type StateOperandType = string | number | null

export type State = {
    currentOperand?: StateOperandType
    previousOperand?: StateOperandType
    operation?: StateOperandType
}

export type Action = {
    type: ACTIONS | null
    payload: {value: string | number}
}
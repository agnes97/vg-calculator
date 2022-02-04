import type { ACTIONS } from '.'

type StateOperandType = string | number | null | (() => void)

// eslint-disable-next-line no-warning-comments
// TODO: Correct type of history!
export type State = {
  currentOperand?: StateOperandType
  previousOperand?: StateOperandType
  operation?: StateOperandType
  overwrite?: boolean
  lastResult?: string | undefined
  history?: unknown
}

export type Action = {
  type: ACTIONS | null
  payload: { value: string | number }
}

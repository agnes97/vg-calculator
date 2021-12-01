import React from 'react'
import { Action, ACTIONS } from '..'

type Props = {
    className?: string
    onClick?: any
    dispatch: ({ type, payload }: Action) => void
    value: string
}

const Button: React.FC<Props> = ({ className, value, dispatch }) => (
    <button 
        className={className} 
        onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {value}})}>
            {value}
    </button>
)

export default Button
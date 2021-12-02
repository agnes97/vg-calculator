import React from 'react'
import { Action, ACTIONS } from '..'

type Props = {
    className?: string
    onClick?: any
    dispatch: ({ type, payload }: Action) => void
    value: Action["payload"]["value"]
    actionType: ACTIONS | null
}

const Button: React.FC<Props> = ({ className, value, dispatch, actionType }) => (
    <button 
        className={className} 
        onClick={() => dispatch({type: actionType, payload: {value}})}>
            {value}
    </button>
)

export default Button
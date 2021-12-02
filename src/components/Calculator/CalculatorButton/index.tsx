import React from 'react'
import { Action } from '..'

type Props = {
    className?: string
    onClick?: any
    dispatch: ({ type, payload }: Action) => void
    value: string | number
    actionType?: string
}

const Button: React.FC<Props> = ({ className, value, dispatch, actionType }) => (
    <button 
        className={className} 
        onClick={() => dispatch({type: actionType ?? "", payload: {value}})}>
            {value}
    </button>
)

export default Button
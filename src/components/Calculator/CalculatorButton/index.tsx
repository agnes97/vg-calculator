import React from 'react'
import { Action } from '..'

type Props = {
    className?: string
    onClick?: any
    dispatch: ({ type, payload }: Action) => void
    value: string
    valueType?: string
}

const Button: React.FC<Props> = ({ className, value, dispatch, valueType }) => (
    <button 
        className={className} 
        onClick={() => dispatch({type: valueType ?? "", payload: {value}})}>
            {value}
    </button>
)

export default Button
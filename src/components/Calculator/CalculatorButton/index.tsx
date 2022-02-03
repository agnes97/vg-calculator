import { FC } from 'react'
import { ACTIONS } from '..'
import { Action } from '../types'

type Props = {
    className?: string
    onClick?: any
    dispatch: ({ type, payload }: Action) => void
    value: Action["payload"]["value"]
    actionType: ACTIONS | null
}

const Button: FC<Props> = ({ className, value, dispatch, actionType }) => {
    const passDispatch = () => dispatch({ type: actionType, payload: { value } })

    return (
        <button
            className={className}
            onClick={passDispatch}>
            {value}
        </button>
    )
}

export default Button
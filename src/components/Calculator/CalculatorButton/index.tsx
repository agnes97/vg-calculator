import type { FC } from 'react'

import type { ACTIONS } from '..'
import type { Action } from '../types'

type Props = {
  className?: string
  onClick?: () => void
  dispatch: ({ type, payload }: Action) => void
  value: Action['payload']['value']
  actionType: ACTIONS | null
}

const Button: FC<Props> = ({ className, value, dispatch, actionType }) => {
  const passDispatch = () => dispatch({ type: actionType, payload: { value } })

  return (
    <button
      type='button'
      className={className}
      onClick={passDispatch}
    >
      {value}
    </button>
  )
}

export default Button

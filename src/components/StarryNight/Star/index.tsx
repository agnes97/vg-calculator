import type { FC } from 'react'
import './index.css'

const Star: FC = () => {
  // 1 is the outline/biggest circle!
  const innerCircles = [1, 2, 3, 4, 5] as const
  const innerCirclesLenght = innerCircles.length - 1

  return [...innerCircles].reverse().reduce(
    (previousValue, innerCircle, index) => (
      <div
        key={innerCircle}
        className={
          `${index === innerCirclesLenght ? 'outline ' : ''}circle-${innerCircle}`
        }
      >
        {previousValue}
      </div>
    ),
    <></>,
  )
}


export default Star

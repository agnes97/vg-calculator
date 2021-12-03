import React from 'react'
import './index.css'


const Star: React.FC = () => {
    const innerCircles = [1, 2, 3, 4, 5] as const // 1 is the outline/biggest circle!
    const innerCirclesLenght = innerCircles.length - 1
    
    return [...innerCircles].reverse().reduce(
        (previousValue, innerCircle, index) => (
            <div 
                key={index} 
                className={
                    `${(index === innerCirclesLenght) ? 'outline ' : ''}circle-${innerCircle}`
                }
            >
                {previousValue}
            </div>
        ), 
    <></>)
    
}


export default Star

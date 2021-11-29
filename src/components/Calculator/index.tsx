import React from 'react'
import './index.css'

const Calculator: React.FC = () => {
    const numbers = [3, 2, 1, 6, 5, 4, 9, 8, 7]
    const signs = ["AC", "√", "%", "÷", "*", "-", "+", "00", "0", ".", "="]

    const alphanumeric = numbers.toString().split(",").concat(signs)

    const fillButtons = () => {  
        const sortedArray: Array<string> = []
        let findSignIndex = 0
        let findNumberIndex = numbers.length - 1

        alphanumeric.forEach((_: string, index: number) => {
            if (index <= 3) {
                sortedArray.push(signs[findSignIndex++])
            }
            else if (index % 3 === 0 && findNumberIndex >= 0) {
                sortedArray.push(numbers[findNumberIndex--].toString())
                sortedArray.push(signs[findSignIndex++])
            }
            else if (findNumberIndex >= 0) {
                sortedArray.push(numbers[findNumberIndex--].toString())
            }
            else if (findSignIndex >= 0 && index < (alphanumeric.length - 3)) {
                sortedArray.push(signs[findSignIndex++])
            }
        });

        return sortedArray
    }

    console.log(fillButtons())

    return (
        <section className="calculator">
            <header className="calculator__header">
                <p>HLAVIČKA</p>
            </header>
            {fillButtons().map((character: string, index: number) => (
                <button 
                    key={index}
                    className={`
                        calculator__button
                        ${!isNaN(+character) ? "calculator__button--number" : "calculator__button--sign"}
                    `}
                >
                    {character}
                </button>
            ))}
        </section>
    )
}

export default Calculator
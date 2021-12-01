// THIS IS AN EXERCISE ON WORKING WITH BAD DATA DESIGN
// Refactored to implement immutability with help of Jindřich Máca!

// Required finished array:
// const result = ["(", ")", "%", "÷",
//                  7, 8, 9, "*", 
//                  4, 5, 6, "-",
//                  1, 2, 3, "+",
//                  "DEL", 0, ".", "="]

export const fillButtons: any = () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const
    const signs = ["(", ")", "%", "÷", "*", "-", "+", "DEL", ".", "="] as const
    
    const reverseNumbers = [...numbers].reverse()

    const rowLength = 4
    const numberOfRows = 5
    const rows = Array(numberOfRows).fill(null)

    const result = rows.map((_, index) => {
        if (index === 0) return signs.slice(0, rowLength)
    
        const rowIndexLength = rowLength - 1
    
        const numbersIndex = index - 1
        const signIndex = index + rowIndexLength
    
        if (index === numberOfRows - 1) return [
            signs[signIndex],
            reverseNumbers[numbersIndex * rowIndexLength],
            ...signs.slice(signIndex + 1)
        ]
    
        const rowNumbers = reverseNumbers
                            .slice(numbersIndex * rowIndexLength, (numbersIndex + 1) * rowIndexLength)
                            .reverse()
    
        const rowSigns = signs.slice(signIndex, signIndex + 1)
    
        return [...rowNumbers, ...rowSigns]
    })

    return result.flat()
}
import * as math from 'mathjs'
import { FC, ReactNode, createContext, useState } from 'react'

interface ICalculatorContext {
	input: string
	handleButtonClick: (value: string) => void
	handleReverseNumber: () => void
	handleClear: () => void
	handleCalculate: () => void
	handlePercent: () => void
}

interface CalculatorProviderProps {
	children: ReactNode
}

export const CalculatorContext = createContext<ICalculatorContext | undefined>(
	undefined
)

export const CalculatorProvider: FC<CalculatorProviderProps> = ({
	children
}) => {
	const [input, setInput] = useState<string>('')

	const handleButtonClick = (value: string) => {
		setInput(prevInput => {
			if (value === '.') {
				const lastNumber = prevInput.split(/[\+\-\*\/]/).pop()

				if (lastNumber && lastNumber.includes('.')) {
					return prevInput
				}
			}

			return prevInput + value
		})
	}

	const handleClear = () => {
		setInput('')
	}

	const handleReverseNumber = () => {
		setInput(prevInput => {
			return (parseFloat(prevInput) * -1).toString()
		})
	}

	const handlePercent = () => {
		setInput(prevInput => {
			return (parseFloat(prevInput) / 100).toString()
		})
	}

	const handleCalculate = () => {
		try {
			setInput(math.evaluate(input).toString())
		} catch (error) {
			setInput('Error')
		}
	}

	const value: ICalculatorContext = {
		input,
		handleButtonClick,
		handleClear,
		handleCalculate,
		handleReverseNumber,
		handlePercent
	}

	return (
		<CalculatorContext.Provider value={value}>
			{children}
		</CalculatorContext.Provider>
	)
}

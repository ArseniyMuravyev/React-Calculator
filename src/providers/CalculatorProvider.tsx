import { FC, ReactNode, createContext, useContext, useState } from 'react'

type Calculator = {
	sign: string
	number: number
	result: number
}

interface ICalculatorContext {
	calc: Calculator
	setCalc: React.Dispatch<React.SetStateAction<Calculator>>
}

interface CalculatorProviderProps {
	children: ReactNode
}

export const CalculatorContext = createContext<ICalculatorContext | undefined>(
	undefined
)

export const useCalculator = () => {
	const context = useContext(CalculatorContext)
	if (!context) {
		throw new Error('Error')
	}
	return context
}

export const CalculatorProvider: FC<CalculatorProviderProps> = ({
	children
}) => {
	const [calc, setCalc] = useState({
		sign: '',
		number: 0,
		result: 0
	})

	const providerValue: ICalculatorContext = {
		calc,
		setCalc
	}

	return (
		<CalculatorContext.Provider value={providerValue}>
			{children}
		</CalculatorContext.Provider>
	)
}

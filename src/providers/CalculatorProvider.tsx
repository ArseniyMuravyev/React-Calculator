import { FC, ReactNode, createContext, useContext, useState } from 'react'

type CalculatorState = {
	sign: string
	number: number
	result: number
}

interface CalculatorContextType {
	calc: CalculatorState
	setCalc: React.Dispatch<React.SetStateAction<CalculatorState>>
}

export const CalculatorContext = createContext<
	CalculatorContextType | undefined
>(undefined)

export const useCalculator = () => {
	const context = useContext(CalculatorContext)
	if (!context) {
		throw new Error('useCalculator must be used within a CalculatorProvider')
	}
	return context
}

export const CalculatorProvider: FC<{ children: ReactNode }> = ({
	children
}) => {
	const [calc, setCalc] = useState<CalculatorState>({
		sign: '',
		number: 0,
		result: 0
	})

	const contextValue: CalculatorContextType = {
		calc,
		setCalc
	}

	return (
		<CalculatorContext.Provider value={contextValue}>
			{children}
		</CalculatorContext.Provider>
	)
}

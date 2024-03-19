import {
	Dispatch,
	FC,
	ReactNode,
	createContext,
	useContext,
	useReducer,
} from 'react'
import { calculatorReducer } from '../components/Calculator/Calculator'
import { Action, CalculatorState } from '../types'

interface CalculatorContextType {
	calc: CalculatorState
	dispatch: Dispatch<Action>
}

export const CalculatorContext = createContext<
	CalculatorContextType | undefined
>(undefined)

export const useCalculator = () => {
	const context = useContext(CalculatorContext)
	if (!context) {
		throw new Error('error')
	}
	return context
}

export const CalculatorProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [calc, dispatch] = useReducer(calculatorReducer, {
		lastOperation: undefined,
		lastOperand: undefined,
		acc: undefined,
		display: 0,
		newOperandFlag: false,
	})

	return (
		<CalculatorContext.Provider value={{ calc, dispatch }}>
			{children}
		</CalculatorContext.Provider>
	)
}

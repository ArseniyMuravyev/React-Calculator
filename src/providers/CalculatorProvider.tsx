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
		sign: '',
		number: 0,
		result: 0,
	})

	return (
		<CalculatorContext.Provider value={{ calc, dispatch }}>
			{children}
		</CalculatorContext.Provider>
	)
}

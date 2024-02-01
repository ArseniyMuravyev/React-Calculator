import { useContext } from 'react'
import { CalculatorContext } from '../providers/CalculatorProvider'

export const useCalculator = () => {
	const context = useContext(CalculatorContext)
	if (!context) {
		throw new Error('Error')
	}
	return context
}

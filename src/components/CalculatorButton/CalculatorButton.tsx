import { FC } from 'react'
import { useCalculator } from '../../providers/CalculatorProvider'
import { Action } from '../../types'
import styles from './CalculatorButton.module.css'

interface CalculatorButtonProps {
	label: string
}

export const CalculatorButton: FC<CalculatorButtonProps> = ({ label }) => {
	const { dispatch } = useCalculator()

	const handleClick = () => {
		let action: Action
		if (isNaN(Number(label))) {
			action = { type: 'HANDLE_ACTION', payload: label }
		} else {
			action = { type: 'DIGIT', payload: Number(label) }
		}
		dispatch(action)
	}

	return (
		<button onClick={handleClick} className={styles.button}>
			{label}
		</button>
	)
}

import { FC } from 'react'
import { Action, CalculatorState, Operation } from '../../types'
import { CalculatorButton } from '../CalculatorButton/CalculatorButton'
import { CalculatorDisplay } from '../CalculatorDisplay/CalculatorDisplay'
import styles from './Calculator.module.css'

const calculatorButtons = [
	'AC',
	'+/-',
	'%',
	'/',
	'7',
	'8',
	'9',
	'×',
	'4',
	'5',
	'6',
	'-',
	'1',
	'2',
	'3',
	'+',
	'0',
	'.',
	'=',
]

export const math: Record<string, Operation> = {
	'+': (result, number) => result + number,
	'-': (result, number) => result - number,
	'×': (result, number) => result * number,
	'/': (result, number) => result / number,
}

export const calculatorReducer = (
	state: CalculatorState,
	action: Action
): CalculatorState => {
	switch (action.type) {
		case 'DIGIT':
			return {
				...state,
				number: Number(state.number.toString() + action.payload),
			}
		case 'HANDLE_ACTION':
			if (action.payload === 'AC') {
				return { sign: '', number: 0, result: 0 }
			}

			if (['+', '-', '×', '/'].includes(action.payload)) {
				return {
					sign: action.payload,
					number: 0,
					result: state.number,
				}
			}

			if (action.payload === '=') {
				const newResult = math[state.sign](state.result, state.number)
				return {
					...state,
					number: newResult,
					result: newResult,
				}
			}

			if (action.payload === '+/-') {
				return { ...state, number: -state.number }
			}

			if (action.payload === '%') {
				return { ...state, number: state.number / 100 }
			}

			if (action.payload === '.' && !state.number.toString().includes('.')) {
				// @ts-ignore
				return { ...state, number: state.number.toString() + '.' }
			}
			return state
		default:
			return state
	}
}

export const Calculator: FC = () => {
	return (
		<div className={styles.calculator}>
			<CalculatorDisplay />
			<div className={styles.buttons}>
				{calculatorButtons.map(label => (
					<CalculatorButton key={label} label={label} />
				))}
			</div>
		</div>
	)
}

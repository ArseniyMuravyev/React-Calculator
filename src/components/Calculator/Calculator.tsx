import { FC } from 'react'
import { Action, CalculatorState, Operation } from '../../types'
import { CalculatorButton } from '../CalculatorButton/CalculatorButton'
import { CalculatorDisplay } from '../CalculatorDisplay/CalculatorDisplay'
import styles from './Calculator.module.css'

const calculatorButtons = [
	'AC',
	'+/-',
	'%',
	'÷',
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
	'+': (firstOperand, secondOperand) => firstOperand + secondOperand,
	'-': (firstOperand, secondOperand) => firstOperand - secondOperand,
	'×': (firstOperand, secondOperand) => firstOperand * secondOperand,
	'÷': (firstOperand, secondOperand) => firstOperand / secondOperand,
}

export const calculatorReducer = (
	state: CalculatorState,
	action: Action
): CalculatorState => {
	switch (action.type) {
		case 'DIGIT': {
			if (state.newOperandFlag) {
				return {
					...state,
					display: Number(action.payload),
					newOperandFlag: false,
				}
			} else {
				return {
					...state,
					display: Number(state.display.toString() + action.payload),
				}
			}
		}
		case 'HANDLE_ACTION':
			if (action.payload === 'AC') {
				return {
					lastOperation: undefined,
					lastOperand: undefined,
					display: 0,
				}
			}

			if (['+', '-', '×', '÷'].includes(action.payload)) {
				return {
					lastOperation: action.payload,
					acc: Number(state.display),
					display: state.display,
					newOperandFlag: true,
				}
			}

			if (action.payload === '=') {
				const tmp = Number(state.lastOperand ?? state.display)
				if (state.lastOperation && tmp && state.acc) {
					const newDisplay = math[state.lastOperation](state.acc, tmp)
					return {
						...state,
						lastOperand: tmp,
						acc: newDisplay,
						display: newDisplay,
					}
				}
			}

			if (action.payload === '+/-') {
				return { ...state, display: -state.display }
			}

			if (action.payload === '%') {
				return { ...state, display: Number(state.display) / 100 }
			}

			if (action.payload === '.' && !state.display.toString().includes('.')) {
				return {
					...state,
					display: state.display.toString() + '.',
				}
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

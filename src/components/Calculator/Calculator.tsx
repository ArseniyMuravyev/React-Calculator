import { FC } from 'react'
import { CalculatorButton } from '../CalculatorButton/CalculatorButton'
import { CalculatorDisplay } from '../CalculatorDisplay/CalculatorDisplay'
import styles from './Calculator.module.css'
import { useCalculator } from '../../providers/CalculatorProvider'

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
	'='
]

export const Calculator: FC = () => {
	const { calc, setCalc } = useCalculator()

	const handleComma = () => {
		if (calc.number.toString().indexOf('.') === -1) {
			setCalc({
				...calc,
				// @ts-ignore
				number: calc.number.toString() + '.'
			})
		}
	}

	const handleClear = () => {
		setCalc({ sign: '', number: 0, result: 0 })
	}

	const handleButtonClick = (label: string) => {
		let numberValue
		if (label === '0' && calc.number === 0) {
			numberValue = '0'
		} else {
			numberValue = Number(calc.number + label)
		}

		setCalc({
			...calc,
			number: Number(numberValue)
		})
	}

	const handleSign = (label: string) => {
		setCalc({
			sign: label,
			number: 0,
			result: !calc.result && calc.number ? calc.number : calc.result
		})
	}

	const math = (a: number, b: number, sign: string) => {
		const result: { [key: string]: (a: number, b: number) => number } = {
			'+': (a, b) => a + b,
			'×': (a, b) => a * b,
			'-': (a, b) => a - b,
			'/': (a, b) => a / b
		}
		return result[sign](a, b)
	}

	const handleEquals = () => {
		if (calc.result && calc.number) {
			setCalc(prev => ({
				sign: prev.sign,
				number: 0,
				result: math(calc.result, calc.number, calc.sign)
			}))
		}
	}

	const handlePercent = () => {
		setCalc({
			sign: '',
			number: calc.number / 100,
			result: calc.result / 100
		})
	}

	const handleInvert = () => {
		setCalc({
			sign: '',
			number: calc.number ? calc.number * -1 : 0,
			result: calc.result ? calc.result * -1 : 0
		})
	}

	const handleClick = (label: string) => {
		if (label === '.') {
			handleComma()
		} else if (label === 'AC') {
			handleClear()
		} else if (['/', '×', '-', '+'].includes(label)) {
			handleSign(label)
		} else if (label === '=') {
			handleEquals()
		} else if (label === '%') {
			handlePercent()
		} else if (label === '+/-') {
			handleInvert()
		} else {
			handleButtonClick(label)
		}
	}

	return (
		<div className={styles.calculator}>
			<CalculatorDisplay />
			<div className={styles.buttons}>
				{calculatorButtons.map((label, index) => (
					<CalculatorButton
						key={index}
						label={label}
						onClick={() => handleClick(label)}
					/>
				))}
			</div>
		</div>
	)
}

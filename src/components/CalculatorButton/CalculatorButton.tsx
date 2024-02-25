import { FC } from 'react'
import { useCalculator } from '../../providers/CalculatorProvider'
import styles from './CalculatorButton.module.css'

interface CalculatorButtonProps {
	label: string
}

interface Results {
	[key: string]: () => void
}

export const CalculatorButton: FC<CalculatorButtonProps> = ({ label }) => {
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

	const handleButtonClick = () => {
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

	const handleSign = () => {
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
			setCalc({
				sign: '',
				number: 0,
				result: math(calc.result, calc.number, calc.sign)
			})
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

	const handleClick = () => {
		const results: Results = {
			'.': handleComma,
			'AC': handleClear,
			'/': handleSign,
			'×': handleSign,
			'-': handleSign,
			'+': handleSign,
			'=': handleEquals,
			'%': handlePercent,
			'+/-': handleInvert
		}
		if (results[label]) {
			return results[label]()
		} else {
			return handleButtonClick()
		}
	}

	return (
		<button onClick={handleClick} className={styles.button}>
			{label}
		</button>
	)
}

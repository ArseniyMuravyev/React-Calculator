import { CalculatorButton } from '../CalculatorButton/CalculatorButton';
import { CalculatorDisplay } from '../CalculatorDisplay/CalculatorDisplay';
import styles from './Calculator.module.css';

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
];

export const Calculator = () => {
	return (
		<div className={styles.calculator}>
			<CalculatorDisplay />
			<div className={styles.buttons}>
				{calculatorButtons.map((label, index) => (
					<CalculatorButton key={index} label={label} />
				))}
			</div>
		</div>
	);
};

import { FC } from 'react';
import { useCalculator } from '../../providers/CalculatorProvider';
import styles from './CalculatorButton.module.css';

interface CalculatorButtonProps {
	label: string;
}

const CalculatorButton: FC<CalculatorButtonProps> = ({ label }) => {
	const {
		handleButtonClick,
		handleCalculate,
		handleClear,
		handleReverseNumber,
		handlePercent
	} = useCalculator();

	const handleClick = () => {
		switch (label) {
			case '=':
				handleCalculate();
				break;
			case '+/-':
				handleReverseNumber();
				break;
			case '%':
				handlePercent();
				break;
			case 'AC':
				handleClear();
				break;
			default:
				handleButtonClick(label);
		}
	};

	return (
		<button onClick={handleClick} className={styles.button}>
			{label}
		</button>
	);
};

export default CalculatorButton;

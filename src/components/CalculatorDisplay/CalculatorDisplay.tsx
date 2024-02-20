import { FC } from 'react';
import { useCalculator } from '../../providers/CalculatorProvider';
import styles from './CalculatorDisplay.module.css';

const CalculatorDisplay: FC = () => {
	const { input } = useCalculator();

	return (
		<div>
			<input
				type='text'
				value={input}
				placeholder='0'
				readOnly
				className={styles.display}
			/>
		</div>
	);
};

export default CalculatorDisplay;

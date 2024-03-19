import { FC } from 'react'
import { Textfit } from 'react-textfit'
import { useCalculator } from '../../providers/CalculatorProvider'
import styles from './CalculatorDisplay.module.css'

export const CalculatorDisplay: FC = () => {
	const { calc } = useCalculator()

	return (
		<div>
			<Textfit className={styles.display} max={50} mode='single'>
				{calc.display}
			</Textfit>
		</div>
	)
}

import { FC } from 'react'
import styles from './CalculatorButton.module.css'

interface CalculatorButtonProps {
	label: string
	onClick: () => void
}

export const CalculatorButton: FC<CalculatorButtonProps> = ({
	label,
	onClick
}) => {
	return (
		<button onClick={onClick} className={styles.button}>
			{label}
		</button>
	)
}

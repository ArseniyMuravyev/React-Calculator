import { evaluate } from 'mathjs';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface ICalculatorContext {
	input: string;
	handleButtonClick: (value: string) => void;
	handleReverseNumber: () => void;
	handleClear: () => void;
	handleCalculate: () => void;
	handlePercent: () => void;
}

interface CalculatorProviderProps {
	children: ReactNode;
}

export const CalculatorContext = createContext<ICalculatorContext | undefined>(
	undefined
);

export const useCalculator = () => {
	const context = useContext(CalculatorContext);
	if (!context) {
		throw new Error('Error');
	}
	return context;
};

export const CalculatorProvider: FC<CalculatorProviderProps> = ({
	children
}) => {
	const [input, setInput] = useState<string>('');

	const handleButtonClick = (value: string) => {
		setInput(prevInput => {
			return prevInput + value;
		});
	};

	const handleClear = () => {
		setInput('');
	};

	const handleReverseNumber = () => {
		setInput(prevInput => {
			return (parseFloat(prevInput) * -1).toString();
		});
	};

	const handlePercent = () => {
		setInput(prevInput => {
			return (parseFloat(prevInput) / 100).toString();
		});
	};

	const handleCalculate = () => {
		try {
			setInput(evaluate(input).toString());
		} catch (error) {
			setInput('Error');
		}
	};

	const value: ICalculatorContext = {
		input,
		handleButtonClick,
		handleClear,
		handleCalculate,
		handleReverseNumber,
		handlePercent
	};

	return (
		<CalculatorContext.Provider value={value}>
			{children}
		</CalculatorContext.Provider>
	);
};

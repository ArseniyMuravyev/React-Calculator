import { Calculator } from './components/Calculator/Calculator';
import { CalculatorProvider } from './providers/CalculatorProvider';

export const App = () => {
	return (
		<CalculatorProvider>
			<Calculator />
		</CalculatorProvider>
	);
};

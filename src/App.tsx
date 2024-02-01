import Calculator from './components/Calculator/Calculator'
import { CalculatorProvider } from './providers/CalculatorProvider'

const App = () => {
	return (
		<CalculatorProvider>
			<Calculator />
		</CalculatorProvider>
	)
}

export default App

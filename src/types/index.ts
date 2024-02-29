export type CalculatorState = {
	sign: string
	number: number
	result: number
}

export type DigitAction = {
	type: 'DIGIT'
	payload: number
}

export type HandleAction = {
	type: 'HANDLE_ACTION'
	payload: string
}

export type Action = DigitAction | HandleAction

export type Operation = (result: number, number: number) => number

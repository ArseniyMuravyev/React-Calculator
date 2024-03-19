type DigitAction = {
	type: 'DIGIT'
	payload: number
}

type HandleAction = {
	type: 'HANDLE_ACTION'
	payload: string
}

export type CalculatorState = {
	lastOperation?: string
	lastOperand?: number
	acc?: number
	display: number | string 
	newOperandFlag?: boolean
}

export type Action = DigitAction | HandleAction

export type Operation = (result: number, number: number) => number

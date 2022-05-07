const equals = document.getElementById('equals');
const firstNumInput = document.getElementById('num-1');
const secondNumInput = document.getElementById('num-2');

equals.addEventListener('click', () => {
	const a = firstNumInput.value;
	const b = secondNumInput.value;
	const selectOperation = document.getElementById('select').value;
	const lastResult = document.querySelector('.oparation_result span');
	
	if(a && b) {
		lastResult.textContent = calculate(a, b, selectOperation);
	} else {
		lastResult.textContent = 'error';
	}

	clearInputs();
});

const clearInputs = () => {
	firstNumInput.value = '';
	secondNumInput.value = '';
};

const calculate = (num, secondNum, operation) => {
	const a = Number(num);
	const b = Number(secondNum);
	let result = 0;

	switch(operation) {
		case 'plus':
			result = a + b;
			break;
		case 'minus':
			result = a - b;
			break;
		case 'multiply':
			result = a * b;
			break;
		case 'divide':
			result = a / b;
			break;
		case 'sqrt':
			result = Math.SQRT${b}(a);
			break;
	}

	return result;
};
const equals = document.getElementById('equals');
const firstNumInput = document.getElementById('num-1');
const secondNumInput = document.getElementById('num-2');
const historyTable = document.querySelector('.history__calc');
const historyOperations = [];

equals.addEventListener('click', () => {
	const a = firstNumInput.value;
	const b = secondNumInput.value;
	const selectOperation = document.getElementById('select').value;
	const lastResult = document.querySelector('.oparation_result span');
	const result = calculate(a, b, selectOperation);
	const now = new Date().toLocaleTimeString(); 

	if(a && b) {
		lastResult.textContent = result;

		createHistoryList({
			a,
			b,
			operation: selectOperation,
			result,
			now
		});

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
		case '+':
			result = a + b;
			break;
		case '-':
			result = a - b;
			break;
		case '*':
			result = a * b;
			break;
		case '/':
			result = a / b;
			break;
		case 'sqrt':
			result = Math.sqrt(a);
			break;
	}

	return result;
};


function createHistoryList(operation) {
	historyOperations.unshift(operation);

	historyTable.innerHTML = "";
	historyTable.innerHTML += `
		<tr class="history__calc_title">
			<th>№</th>
			<th>Number 1</th>
			<th>Operation</th>
			<th>Number 2</th>
			<th>Equals</th>
			<th>Date</th>
		</tr>
	`;

	historyOperations.forEach((historyOperation, i) => {
		if (i < 5) {
			historyTable.innerHTML += `
				<tr class="history__interactive-list">
					<td>${i + 1}</td>
					<td>${historyOperation.a}</td>
					<td>${historyOperation.operation}</td>
					<td>${historyOperation.b}</td>
					<td>${historyOperation.result}</td>
					<td>${historyOperation.now}</td>
				</tr>
			`;
		} else {
			historyOperations.splice(5, 1);
		}
	});
}




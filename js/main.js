const equals = document.getElementById('equals');
const firstNumInput = document.getElementById('num-1');
const secondNumInput = document.getElementById('num-2');
const historyTable = document.querySelector('.history__calc');
const localStorageKey = 'history';
let historyOperations = JSON.parse(localStorage.getItem(localStorageKey)) ?? [];
const historyDelete = document.querySelector('.history_delete');

createHistoryList();

historyDelete.addEventListener('click', (e) => {
	e.preventDefault();

	historyOperations=[];
	localStorage.removeItem(localStorageKey);
	
	createHistoryList();
});


equals.addEventListener('click', () => {
	const a = firstNumInput.value;
	const b = secondNumInput.value;
	const selectOperation = document.getElementById('select').value;
	const lastResult = document.querySelector('.oparation_result span');
	const result = calculate(a, b, selectOperation);
	const now = new Date().toLocaleTimeString(); 

	if(a && b) {
		lastResult.textContent = result;
		
		historyOperations.unshift({
			a,
			b,
			operation: selectOperation,
			result,
			now
		});

		createHistoryList();
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
	}

	return result;
};


function createHistoryList() {
	historyTable.innerHTML = "";
	historyTable.innerHTML += `
		<tr class="history__calc_title">
			<th>№</th>
			<th>Number 1</th>
			<th>Operation</th>
			<th>Number 2</th>
			<th>Equals</th>
			<th>Date</th>
			<th>Actions</th>
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
					<td class="history_item_delete">Delete</td>
				</tr>
			`;
		} else {
			historyOperations.splice(5, 1);
		}
	});

	historyItemDelete();

	localStorage.setItem(localStorageKey, JSON.stringify(historyOperations)); 
}

function historyItemDelete() {
	document.querySelectorAll('.history_item_delete').forEach((btn, i) => {
		btn.addEventListener('click', () => {
			historyOperations.splice(i, 1);

			createHistoryList();
		});
	});

}


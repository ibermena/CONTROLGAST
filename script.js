// Variables para almacenar los gastos por día
let expensesByDate = {};

// Obtener la fecha seleccionada en el selector
const datePicker = document.getElementById('datePicker');
const expensesTableBody = document.getElementById('expensesTableBody');
const totalAmount = document.getElementById('totalAmount');

// Seleccionar la fecha actual por defecto
datePicker.valueAsDate = new Date();

// Evento para actualizar la lista de gastos al cambiar la fecha
datePicker.addEventListener('change', updateExpensesList);

// Función para agregar un nuevo gasto
function addExpense() {
  const date = datePicker.value;
  const name = document.getElementById('expenseName').value;
  const provider = document.getElementById('expenseProvider').value;
  const amount = parseFloat(document.getElementById('expenseAmount').value);

  if (!name || !provider || isNaN(amount) || amount <= 0) {
    alert("Por favor, rellena todos los campos con datos válidos.");
    return;
  }

  // Si no existe la fecha en los gastos, crear un nuevo array
  if (!expensesByDate[date]) {
    expensesByDate[date] = [];
  }

  // Añadir el nuevo gasto a la fecha seleccionada
  expensesByDate[date].push({ name, provider, amount });

  // Limpiar los campos del formulario
  document.getElementById('expenseName').value = '';
  document.getElementById('expenseProvider').value = '';
  document.getElementById('expenseAmount').value = '';

  // Actualizar la lista de gastos
  updateExpensesList();
}

// Función para actualizar la lista de gastos y el total
function updateExpensesList() {
  const date = datePicker.value;
  const expenses = expensesByDate[date] || [];

  // Limpiar la tabla de gastos
  expensesTableBody.innerHTML = '';

  // Variables para calcular el total de gastos
  let total = 0;

  // Rellenar la tabla con los gastos del día seleccionado
  expenses.forEach(expense => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.provider}</td>
      <td>€${expense.amount.toFixed(2)}</td>
    `;
    expensesTableBody.appendChild(row);
    total += expense.amount;
  });

  // Actualizar el total
  totalAmount.textContent = total.toFixed(2);
}
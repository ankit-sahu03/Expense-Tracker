const transactionForm = document.getElementById('transactionForm');
    const transactionList = document.getElementById('transactionList');
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpenseEl = document.getElementById('totalExpense');
    const netIncomeEl = document.getElementById('netIncome');

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function renderTransactions() {
      transactionList.innerHTML = '';
      let totalIncome = 0;
      let totalExpense = 0;

      transactions.forEach((tx, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${tx.date}</td>
          <td>${tx.description}</td>
          <td>${tx.type}</td>
          <td>${tx.category}</td>
          <td>${tx.amount}</td>
          <td><button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button></td>
        `;
        transactionList.appendChild(row);

        if (tx.type === "income") {
          totalIncome += Number(tx.amount);
        } else {
          totalExpense += Number(tx.amount);
        }
      });

      totalIncomeEl.textContent = totalIncome.toFixed(2);
      totalExpenseEl.textContent = totalExpense.toFixed(2);
      netIncomeEl.textContent = (totalIncome - totalExpense).toFixed(2);
    }

    function deleteTransaction(index) {
      transactions.splice(index, 1);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      renderTransactions();
    }

    transactionForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const date = document.getElementById('date').value;
      const description = document.getElementById('description').value;
      const type = document.getElementById('type').value;
      const category = document.getElementById('category').value;
      const amount = parseFloat(document.getElementById('amount').value);

      if (!date || !description || !type || !category || isNaN(amount) || amount <= 0) {
        alert("Please fill all fields correctly.");
        return;
      }

      const newTransaction = { date, description, type, category, amount };
      transactions.push(newTransaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      renderTransactions();

      transactionForm.reset();
    });

    renderTransactions();


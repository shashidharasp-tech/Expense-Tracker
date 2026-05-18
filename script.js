let allExpenses = JSON.parse(localStorage.getItem("allExpenses")) || {};

window.onload = function () {

    const today = new Date().toISOString().split("T")[0];

    document.getElementById("date").value = today;

    loadExpenses();
};

function loadExpenses() {

    const selectedDate = document.getElementById("date").value;

    const expenseList = document.getElementById("expense-list");

    expenseList.innerHTML = "";

    let total = 0;

    if (!allExpenses[selectedDate]) {

        document.getElementById("total").innerText = 0;

        return;
    }

    allExpenses[selectedDate].forEach((expense, index) => {

        total += expense.amount;

        const card = document.createElement("div");

        card.classList.add("expense-card");

        card.innerHTML = `
            <div class="expense-info">
                <h3>${expense.title}</h3>
                <p>Amount: ₹${expense.amount}</p>
            </div>

            <button class="delete-btn"
            onclick="deleteExpense('${selectedDate}', ${index})">
                Delete
            </button>
        `;

        expenseList.appendChild(card);

    });

    document.getElementById("total").innerText = total;
}

function addExpense() {

    const selectedDate = document.getElementById("date").value;

    const title = document.getElementById("title").value;

    const amount = document.getElementById("amount").value;

    if (selectedDate === "" || title === "" || amount === "") {

        alert("Please fill all fields");

        return;
    }

    if (!allExpenses[selectedDate]) {

        allExpenses[selectedDate] = [];
    }

    allExpenses[selectedDate].push({
        title: title,
        amount: Number(amount)
    });

    localStorage.setItem("allExpenses", JSON.stringify(allExpenses));

    document.getElementById("title").value = "";

    document.getElementById("amount").value = "";

    loadExpenses();
}

function deleteExpense(date, index) {

    allExpenses[date].splice(index, 1);

    localStorage.setItem("allExpenses", JSON.stringify(allExpenses));

    loadExpenses();
}
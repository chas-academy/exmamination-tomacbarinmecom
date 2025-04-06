// Hämta DOM-element
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const transactionList = document.getElementById("transactionList");
const balanceSpan = document.getElementById("balance");

// Arrayer för transaktioner
let income = [];
let expenses = [];

// Funktion för att lägga till en transaktion
function addTransaction(type) {
    const description = descInput.value;
    const amount = Number(amountInput.value);

    // Kontrollera att fälten inte är tomma eller ogiltiga
    if (description === "" || isNaN(amount) || amount <= 0) {
        return;
    }

    // Skapa transaktionsobjekt
    const transaction = {
        description: description,
        amount: amount,
        type: type
    };

    // Lägg till i rätt array
    if (type === "income") {
        income.push(transaction);
    } else if (type === "expense") {
        expenses.push(transaction);
    }
    
    // Rensa input-fälten
    descInput.value = "";
    amountInput.value = "";

    // Uppdatera listor och saldo
    renderLists();


}
 // Funktion för att rendera listor och beräkna saldo
 function renderLists() {
    // Tömma listorna först!
    if (incomeList) incomeList.innerHTML = "";
    if (expenseList) expenseList.innerHTML = "";
    if (transactionList) transactionList.innerHTML = "";

    // Rendera inkomster
    for (let item of income) {
        const li = document.createElement("li");
        li.textContent = `${item.description} - ${item.amount} kr (Inkomst)`;
        if (incomeList) incomeList.appendChild(li);

        // Lägg även till i transaktionslistan
        const transLi = document.createElement("li");
        transLi.textContent = `${item.description} - ${item.amount} kr (Inkomst)`;
        if (transactionList) transactionList.appendChild(transLi);
    }
    // Rendera utgifter
    for (let item of expenses) {
        const li = document.createElement("li");
        li.textContent = `${item.description} - ${item.amount} kr (Utgift)`;
        if (expenseList) expenseList.appendChild(li);

        // Lägg till i transaktionslistan också
        const transLi = document.createElement("li");
        transLi.textContent = `${item.description} - ${item.amount} kr (Utgift)`;
        if (transactionList) transactionList.appendChild(transLi);
    }
    // Beräkna saldo
    let totalIncome = 0;
    for (let item of income) {
        totalIncome += item.amount;
    }
    let totalExpenses = 0;
    for (let item of expenses) {
        totalExpenses += item.amount;
    }
    const balance = totalIncome - totalExpenses;

    // Visa saldo
    if (balanceSpan) balanceSpan.textContent = balance;
}

// Event-lyssnare för knapparna
incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));







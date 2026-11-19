import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  // Display transactions when app loads
  useEffect(() => {
    fetch("http://localhost:6001/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);

  // Add new transaction
  function postTransaction(newTransaction) {
    fetch("http://localhost:6001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions([...transactions, data]);
      });
  }

  // Sort transactions
  function onSort(sortBy) {
    const sortedTransactions = [...transactions].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy])
    );

    setTransactions(sortedTransactions);
  }

  // Search transactions
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <Search setSearch={setSearch} />

      <AddTransactionForm
        postTransaction={postTransaction}
      />

      <Sort onSort={onSort} />

      <TransactionsList
        transactions={filteredTransactions}
      />
    </div>
  );
}

export default AccountContainer;
// dummyData.ts

import { Transaction } from "@/types/types";

export const dummyTransactions: Transaction[] = [
  {
    category: {
      name: "Utilities",
      icon: "bulb", // Ionicons name
      backgroundColor: "#e4ba00",
    },
    type: "expense",
    description: "Electricity Bill",
    amount: -25,
    date: "25 Nov",
  },
  {
    category: {
      name: "Salary",
      icon: "cash",
      backgroundColor: "#00e4b1",
    },
    type: "income",
    description: "Monthly Salary",
    amount: 1500,
    date: "20 Nov",
  },
  {
    category: {
      name: "Groceries",
      icon: "cart",
      backgroundColor: "#ff6347",
    },
    type: "expense",
    description: "Supermarket shopping",
    amount: -75,
    date: "18 Nov",
  },
  {
    category: {
      name: "Entertainment",
      icon: "game-controller",
      backgroundColor: "#4682b4",
    },
    type: "expense",
    description: "Streaming Service Subscription",
    amount: -15,
    date: "17 Nov",
  },
  {
    category: {
      name: "Freelance",
      icon: "briefcase",
      backgroundColor: "#ffa500",
    },
    type: "income",
    description: "Freelance Web Design Project",
    amount: 400,
    date: "15 Nov",
  },
  {
    category: {
      name: "Food",
      icon: "restaurant",
      backgroundColor: "#ff4500",
    },
    type: "expense",
    description: "Dinner at restaurant",
    amount: -45,
    date: "14 Nov",
  },
  {
    category: {
      name: "Salary",
      icon: "cash",
      backgroundColor: "#00e4b1",
    },
    type: "income",
    description: "Freelance Payment",
    amount: 600,
    date: "12 Nov",
  },
  {
    category: {
      name: "Transport",
      icon: "car",
      backgroundColor: "#8a2be2",
    },
    type: "expense",
    description: "Fuel for the car",
    amount: -50,
    date: "10 Nov",
  },
  {
    category: {
      name: "Shopping",
      icon: "shirt",
      backgroundColor: "#32cd32",
    },
    type: "expense",
    description: "New clothes for the season",
    amount: -120,
    date: "8 Nov",
  },
  {
    category: {
      name: "Gift",
      icon: "gift",
      backgroundColor: "#ff1493",
    },
    type: "expense",
    description: "Birthday gift for a friend",
    amount: -30,
    date: "6 Nov",
  },
  {
    category: {
      name: "Investment",
      icon: "wallet",
      backgroundColor: "#2e8b57",
    },
    type: "income",
    description: "Return on Investment",
    amount: 200,
    date: "3 Nov",
  },
  {
    category: {
      name: "Health",
      icon: "heart",
      backgroundColor: "#ff69b4",
    },
    type: "expense",
    description: "Gym membership",
    amount: -50,
    date: "1 Nov",
  },
  {
    category: {
      name: "Rent",
      icon: "home",
      backgroundColor: "#8b0000",
    },
    type: "expense",
    description: "Monthly rent payment",
    amount: -800,
    date: "30 Oct",
  },
  {
    category: {
      name: "Loan",
      icon: "caret-up",
      backgroundColor: "#b22222",
    },
    type: "expense",
    description: "Loan repayment",
    amount: -150,
    date: "28 Oct",
  },
  {
    category: {
      name: "Bonus",
      icon: "trophy",
      backgroundColor: "#ffd700",
    },
    type: "income",
    description: "Year-end Bonus",
    amount: 1000,
    date: "25 Oct",
  },
];

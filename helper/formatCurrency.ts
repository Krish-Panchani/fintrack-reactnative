export const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
};

const rates = [
  {
    unit: "1",
    weekly: { mo: 100, tu: 110, we:110, th: 110, fr: 120, sa: 130, su: 130 },
    extra: { max: 2, amount: 40 },
    discounts: { weekly: 30, monthly 35 },
    exceptions: { '20161225': 170 }
  }
];

module.exports = rates;

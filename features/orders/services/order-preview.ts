export const previewOrder = {
  id: "MTH-1042",
  date: "18 Aug 2026",
  status: "Delivered" as const,
  address: ["14 Garden Street", "Cairo, Egypt"],
  items: [
    { name: "Morning No. 01", detail: "250 g, whole bean", quantity: 1, price: 18 },
    { name: "Highland No. 02", detail: "250 g, filter", quantity: 1, price: 22 },
  ],
  subtotal: 40,
  total: 40,
};

export const orderSteps = [
  { label: "Order placed", date: "18 Aug, 09:12", copy: "Your order was received by the roastery." },
  { label: "Roasted and packed", date: "18 Aug, 14:40", copy: "Your coffee was packed with its roast date visible." },
  { label: "Delivered", date: "20 Aug, 11:05", copy: "The morning has arrived at your door." },
];

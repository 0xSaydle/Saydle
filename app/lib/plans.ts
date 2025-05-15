
const plans = [
  {
    productId: process.env.NEXT_PUBLIC_LS_WEEKLY_PRODUCT_ID,
    title: "Weekly",
    price: "3.99",
    period: "week",
    features: [
      "Unlimited access to all features",
      "Personalized daily affirmations",
      "Progress tracking",
      "Community support",
      "Basic meditation guides",
    ],
    icon: " 👋🏽",
    description: "Perfect for those starting their journey",
  },
  {
    productId: process.env.NEXT_PUBLIC_LS_MONTHLY_PRODUCT_ID,
    title: "Monthly",
    price: "12.99",
    period: "month",
    features: [
      "Everything in Weekly plan",
      "Advanced meditation guides",
      "Priority support",
      "Exclusive workshops",
      "Early access to new features",
    ],
    icon: "💪🏽",
    description: "Best value for committed users",
    special: "on",
  },
];
export default plans;
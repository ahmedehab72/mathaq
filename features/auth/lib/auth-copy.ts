export type AuthMode = "register" | "forgot" | "reset";

export const authCopy = {
  register: { eyebrow: "Create account", title: "Make room for better mornings.", description: "Save your coffees, recipes, and orders in one place." },
  forgot: { eyebrow: "Reset access", title: "Find your way back.", description: "We will send a quiet little note to your inbox." },
  reset: { eyebrow: "New password", title: "Start with a clean slate.", description: "Choose a password you will remember." },
} as const;

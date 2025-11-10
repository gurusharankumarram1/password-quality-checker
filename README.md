# password-quality-checker

[![npm version](https://img.shields.io/npm/v/password-quality-checker.svg)](https://www.npmjs.com/package/password-quality-checker)
[![total npm downloads](https://img.shields.io/npm/dt/password-quality-checker.svg)](https://www.npmjs.com/package/password-quality-checker)
[![license](https://img.shields.io/npm/l/password-quality-checker.svg)](https://github.com/gurusharankumarram1/password-quality-checker/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/gurusharankumarram1/password-quality-checker.svg?style=social)](https://github.com/gurusharankumarram1/password-quality-checker)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0-brightgreen)](https://nodejs.org/)

---

A lightweight utility to check **password strength, entropy, and quality** with detailed feedback.

---

## ✅ Features
- ✔️ Calculates **entropy** using `log₂(charsetSize^length)` for predictability measurement.
- ✔️ Checks for **length, uppercase/lowercase, numbers, symbols, and patterns**.
- ✔️ Provides **score (0–100)**, **strength label**, and actionable **feedback**.
- ✔️ Fully customizable with user-defined options.
- ✔️ Works in both **Node.js** and **browser** environments.
- ✔️ Zero dependencies — **lightweight and fast**.

---

## 🚀 Installation

```bash
npm install password-quality-checker
````

---

## 🧠 Usage

### ✅ Basic Example

```js
const checkPasswordQuality = require('password-quality-checker');

const result = checkPasswordQuality('MyStr0ng!Pass123');

console.log(result);
```

**Output Example:**

```js
{
  valid: true,
  score: 88,
  entropy: 76.54,
  strength: 'Strong',
  feedback: []
}
```

---

## ⚙️ Options

You can pass a configuration object as the **second argument** to customize checks:

```js
const options = {
  minLength: 10,
  maxLength: 100,
  requireUpper: true,
  requireLower: true,
  requireNumber: true,
  requireSymbol: true,
  minEntropy: 40,
  commonPasswords: ['password', '123456', 'qwerty', 'letmein', 'admin']
};

const result = checkPasswordQuality('ExamplePass123!', options);
console.log(result);
```

### 📘 Option Details

| Option              | Type       | Default           | Description                                |
| ------------------- | ---------- | ----------------- | ------------------------------------------ |
| **minLength**       | `number`   | `8`               | Minimum password length                    |
| **maxLength**       | `number`   | `128`             | Maximum password length                    |
| **requireUpper**    | `boolean`  | `true`            | Require at least one uppercase letter      |
| **requireLower**    | `boolean`  | `true`            | Require at least one lowercase letter      |
| **requireNumber**   | `boolean`  | `true`            | Require at least one numeric digit         |
| **requireSymbol**   | `boolean`  | `true`            | Require at least one special character     |
| **minEntropy**      | `number`   | `35`              | Minimum entropy threshold (predictability) |
| **commonPasswords** | `string[]` | Default weak list | Passwords to block completely              |

---

## 🧩 Return Object

```js
{
  valid: Boolean,         // true if password passes checks and score ≥ 60
  score: Number,          // overall strength score (0–100)
  entropy: Number,        // calculated entropy
  strength: String,       // 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong'
  feedback: [String]      // list of improvement suggestions
}
```

### Example Output

```js
{
  valid: false,
  score: 45,
  entropy: 32.56,
  strength: 'Fair',
  feedback: [
    'Add special characters.',
    'Avoid simple sequences like 1234 or qwerty.'
  ]
}
```

---

## 📊 Scoring System

* **Base Score:** `length × 2` (max 25)
* **Bonuses:**

  * Uppercase → +10
  * Lowercase → +10
  * Number → +10
  * Symbol → +15
  * Unique characters > 8 → +10
  * Entropy > 45 → +10
* **Penalties:** −5 per feedback message
* **Total Range:** 0–100

---

## ⚠️ Security Disclaimer

This tool is for **educational and validation purposes** only.
It estimates password strength but does **not guarantee absolute security**.
Always **hash and salt** passwords before storing them.

---

## 💡 Use Cases

* ✅ Password validation in signup forms
* ✅ Security auditing tools
* ✅ Backend password policy enforcement
* ✅ Frontend password strength meters

---
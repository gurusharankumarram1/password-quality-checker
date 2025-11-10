/**
 * password-quality-checker
 * 
 * Checks the strength and robustness of a password based on multiple criteria.
 * @param {string} password - The password string to check.
 * @param {object} options - Optional settings to override defaults.
 * @returns {object} The evaluation result including score, strength, and feedback.
 */

function checkPasswordQuality(password, options = {}) {
  const settings = getSettings(options);
  if (typeof password !== 'string') {
    return invalidResult('Password must be a string.');
  }

  const feedback = [];
  const checks = runChecks(password, settings, feedback);
  const entropy = calculateEntropy(password);

  if (entropy < settings.minEntropy)
    feedback.push('Password entropy is too low (too predictable).');

  const score = calculateScore(password, checks, feedback.length, entropy);
  const strength = getStrengthLabel(score);
  const valid = feedback.length === 0 && score >= 60;

  return {
    valid,
    score,
    entropy: Math.round(entropy * 100) / 100,
    strength,
    feedback
  };
}

function getSettings(options) {
  return {
    minLength: 8,
    maxLength: 128,
    requireUpper: true,
    requireLower: true,
    requireNumber: true,
    requireSymbol: true,
    minEntropy: 35,
    commonPasswords: ['password', 'password123', '123456', 'qwerty', 'admin', 'welcome', 'abc123', '123123'],
    ...options
  };
}

function invalidResult(message) {
  return { valid: false, score: 0, strength: 'Very Weak', feedback: [message] };
}

function runChecks(password, settings, feedback) {
  const result = {
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
    uniqueChars: new Set(password).size
  };

  checkLength(password, settings, feedback);
  checkCharacterRequirements(result, settings, feedback);
  checkPatterns(password, feedback);
  checkCommonPasswords(password, settings, feedback);

  return result;
}

function checkLength(password, settings, feedback) {
  if (password.length < settings.minLength)
    feedback.push(`Password must be at least ${settings.minLength} characters long.`);
  if (password.length > settings.maxLength)
    feedback.push(`Password must be less than ${settings.maxLength} characters.`);
}

function checkCharacterRequirements(result, settings, feedback) {
  if (settings.requireUpper && !result.upper) feedback.push('Add uppercase letters.');
  if (settings.requireLower && !result.lower) feedback.push('Add lowercase letters.');
  if (settings.requireNumber && !result.number) feedback.push('Add numbers.');
  if (settings.requireSymbol && !result.symbol) feedback.push('Add special characters.');
}

function checkPatterns(password, feedback) {
  if (/^(.)\1+$/.test(password)) feedback.push('Avoid repeating the same character.');
  if (/1234|abcd|qwerty|asdf|password|0000/i.test(password))
    feedback.push('Avoid simple sequences like 1234 or qwerty.');
}

function checkCommonPasswords(password, settings, feedback) {
  if (settings.commonPasswords.includes(password.toLowerCase()))
    feedback.push('Password is too common.');
}

function calculateEntropy(password) {
  const charSetSize = 
    (password.match(/[A-Z]/g) ? 26 : 0) +
    (password.match(/[a-z]/g) ? 26 : 0) +
    (password.match(/\d/g) ? 10 : 0) +
    (password.match(/[^A-Za-z0-9]/g) ? 32 : 0);

  const base = charSetSize || 1;
  return Math.log2(Math.pow(base, password.length));
}

function calculateScore(password, checks, feedbackCount, entropy) {
  let score = Math.min(25, password.length * 2);
  if (checks.upper) score += 10;
  if (checks.lower) score += 10;
  if (checks.number) score += 10;
  if (checks.symbol) score += 15;
  if (checks.uniqueChars > 8) score += 10;
  if (entropy > 45) score += 10;
  score -= feedbackCount * 5;
  return Math.max(0, Math.min(100, score));
}

function getStrengthLabel(score) {
  if (score >= 80) return 'Strong';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Weak';
  return 'Very Weak';
}

module.exports = checkPasswordQuality;

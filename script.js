const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const suggestions = document.getElementById('suggestions');
const toggleBtn = document.getElementById('toggleBtn');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const generatedInput = document.getElementById('generated');
const copyStatus = document.getElementById('copyStatus');

passwordInput.addEventListener('input', analyzePassword);
toggleBtn.addEventListener('click', toggleVisibility);
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

function analyzePassword() {
  const pw = passwordInput.value;
  let score = 0;
  let feedback = [];

  if (pw.length >= 12) score += 2;
  else if (pw.length >= 8) score += 1;
  else feedback.push("Use at least 8 characters (12+ is better).");

  if (/[A-Z]/.test(pw)) score++;
  else feedback.push("Add uppercase letters.");

  if (/[a-z]/.test(pw)) score++;
  else feedback.push("Add lowercase letters.");

  if (/[0-9]/.test(pw)) score++;
  else feedback.push("Add numbers.");

  if (/[@$!%*?&#^()_\-+=<>]/.test(pw)) score++;
  else feedback.push("Add special characters.");

  if (/password|1234|qwerty|abcd|admin|user/i.test(pw))
    feedback.push("Avoid common patterns like 'password' or '1234'.");

  let strength = "Weak";
  let color = "red";
  let width = "33%";
  if (score >= 5) { strength = "Strong"; color = "green"; width = "100%"; }
  else if (score >= 3) { strength = "Moderate"; color = "orange"; width = "66%"; }

  strengthBar.style.width = width;
  strengthBar.style.background = color;
  strengthText.textContent = `Strength: ${strength}`;
  suggestions.innerHTML = feedback.map(f => `<li>${f}</li>`).join('');
}

function toggleVisibility() {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  toggleBtn.textContent = type === 'password' ? '👁️' : '🙈';
}

function generatePassword() {
  const length = parseInt(document.getElementById('length').value) || 16;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&#^()_-+=<>";
  let pw = "";
  for (let i = 0; i < length; i++) {
    pw += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  generatedInput.value = pw;
  copyStatus.textContent = "";
}

function copyPassword() {
  if (!generatedInput.value) {
    copyStatus.textContent = "No password to copy.";
    return;
  }
  navigator.clipboard.writeText(generatedInput.value);
  copyStatus.textContent = "Copied!";
  setTimeout(() => copyStatus.textContent = "", 1500);
}

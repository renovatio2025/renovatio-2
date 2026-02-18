/**
 * LottoBall Web Component
 * Displays a stylish lotto ball with a color based on its number range.
 */
class LottoBall extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const number = parseInt(this.getAttribute('number') || '0');
    this.style.setProperty('--ball-color', this.getColor(number));
    this.textContent = number;
    
    // Add accessibility label
    this.setAttribute('aria-label', `Lotto number ${number}`);
    this.setAttribute('role', 'status');
  }

  getColor(number) {
    if (number <= 10) return 'var(--ball-1-10)';
    if (number <= 20) return 'var(--ball-11-20)';
    if (number <= 30) return 'var(--ball-21-30)';
    if (number <= 40) return 'var(--ball-31-40)';
    return 'var(--ball-41-45)';
  }
}

// Register the custom element
if (!customElements.get('lotto-ball')) {
  customElements.define('lotto-ball', LottoBall);
}

/**
 * Lotto Logic
 */
const ballsContainer = document.getElementById('balls-container');
const generateBtn = document.getElementById('generate-btn');

function generateLottoNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const r = Math.floor(Math.random() * 45) + 1;
    if (numbers.indexOf(r) === -1) numbers.push(r);
  }
  return numbers.sort((a, b) => a - b);
}

async function displayNumbers(numbers) {
  // Clear previous balls
  ballsContainer.innerHTML = '';
  
  // Create and add balls with a small delay for animation effect
  for (let i = 0; i < numbers.length; i++) {
    const ball = document.createElement('lotto-ball');
    ball.setAttribute('number', numbers[i]);
    // Stagger the animation
    ball.style.animationDelay = `${i * 150}ms`;
    ballsContainer.appendChild(ball);
  }
}

// Event Listeners
generateBtn.addEventListener('click', () => {
  const numbers = generateLottoNumbers();
  displayNumbers(numbers);
  
  // Haptic feedback (if supported)
  if ('vibrate' in navigator) {
    navigator.vibrate(20);
  }
});

// Initial generation
window.addEventListener('DOMContentLoaded', () => {
  const initialNumbers = generateLottoNumbers();
  displayNumbers(initialNumbers);
});

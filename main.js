document.addEventListener('DOMContentLoaded', () => {
    initSupplyChart();
    initTabNavigation();
    initStrategySimulation();
    initScoreCalculations();
});

/**
 * Supply Ratio Chart - Clean Professional Style
 */
function initSupplyChart() {
    const canvas = document.getElementById('supplyChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['특별공급 (70%)', '일반공급 (30%)'],
            datasets: [{
                data: [70, 30],
                backgroundColor: ['#1E3A8A', '#E5E7EB'],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: { 
                    position: 'bottom', 
                    labels: { 
                        padding: 30, 
                        font: { family: '"Noto Sans KR"', size: 14, weight: '700' },
                        color: '#1F2937'
                    } 
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

/**
 * Main Tab Navigation Logic
 */
function initTabNavigation() {
    const tabs = {
        'nav-dashboard': 'dashboard',
        'nav-strategies': 'strategies',
        'nav-pitfalls': 'pitfalls',
        'nav-secrets': 'secrets'
    };

    Object.keys(tabs).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (!btn) return;

        btn.addEventListener('click', () => {
            // UI Update
            document.querySelectorAll('.nav-item').forEach(b => {
                b.classList.remove('nav-active', 'text-primary');
                b.classList.add('text-gray-500');
            });
            btn.classList.add('nav-active', 'text-primary');
            btn.classList.remove('text-gray-500');

            // Content Update
            document.querySelectorAll('.tab-content').forEach(c => {
                c.classList.add('hidden');
                c.classList.remove('block');
            });
            const activeContent = document.getElementById(tabs[btnId]);
            activeContent.classList.remove('hidden');
            activeContent.classList.add('block');
        });
    });
}

/**
 * Strategy Sub-tabs Switching
 */
function initStrategySimulation() {
    const stratButtons = {
        'btn-multi': 'strat-multi',
        'btn-newlywed': 'strat-newlywed',
        'btn-newborn': 'strat-newborn'
    };

    Object.keys(stratButtons).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (!btn) return;

        btn.addEventListener('click', () => {
            // UI Update
            document.querySelectorAll('.strat-btn').forEach(b => {
                b.classList.remove('active-strat');
                b.classList.add('text-gray-500');
            });
            btn.classList.add('active-strat');
            btn.classList.remove('text-gray-500');

            // Content Update
            document.querySelectorAll('.strategy-detail').forEach(c => {
                c.classList.add('hidden');
                c.classList.remove('block');
            });
            const activeContent = document.getElementById(stratButtons[btnId]);
            activeContent.classList.remove('hidden');
            activeContent.classList.add('block');
        });
    });
}

/**
 * Score Calculators for Simulator
 */
function initScoreCalculations() {
    // Multi-child Calculator
    const mcInputs = ['multi-kids', 'multi-babies', 'multi-3gen'];
    mcInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', calcMultiScore);
        }
    });

    // Initial calculation
    calcMultiScore();
}

function calcMultiScore() {
    const kids = parseInt(document.getElementById('multi-kids').value);
    const babies = parseInt(document.getElementById('multi-babies').value);
    const is3Gen = document.getElementById('multi-3gen').checked;
    
    // Base score (Res/House/Savings) assumed max 40 for serious candidates
    const baseScore = 40; 
    const threeGenScore = is3Gen ? 5 : 0;

    const total = baseScore + kids + babies + threeGenScore;
    
    const displayEl = document.getElementById('multi-score-display');
    displayEl.innerText = total + "점";

    // Dynamic Styling based on score
    if (total >= 80) {
        displayEl.className = "text-4xl font-black text-emerald-600";
    } else if (total >= 75) {
        displayEl.className = "text-4xl font-black text-amber-600";
    } else {
        displayEl.className = "text-4xl font-black text-primary";
    }
}

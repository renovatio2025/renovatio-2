document.addEventListener('DOMContentLoaded', () => {
    initSupplyChart();
    initTabNavigation();
    initStrategySimulation();
    initScoreCalculations();
    initShinhuitaSimulator();
});

/**
 * Supply Ratio Chart
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
 * Main Tab Navigation
 */
function initTabNavigation() {
    const tabs = {
        'nav-dashboard': 'dashboard',
        'nav-qualifications': 'qualifications',
        'nav-strategies': 'strategies',
        'nav-shinhuita': 'shinhuita',
        'nav-pitfalls': 'pitfalls',
        'nav-secrets': 'secrets'
    };

    Object.keys(tabs).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (!btn) return;

        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(b => {
                b.classList.remove('nav-active', 'text-primary');
                b.classList.add('text-gray-500');
            });
            btn.classList.add('nav-active', 'text-primary');
            btn.classList.remove('text-gray-500');

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
 * Strategy Sub-tabs
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
            document.querySelectorAll('.strat-btn').forEach(b => {
                b.classList.remove('active-strat');
                b.classList.add('text-gray-500');
            });
            btn.classList.add('active-strat');
            btn.classList.remove('text-gray-500');

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
 * Multi-child Score Calc
 */
function initScoreCalculations() {
    const mcInputs = ['multi-kids', 'multi-babies', 'multi-3gen'];
    mcInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', calcMultiScore);
    });
    calcMultiScore();
}

function calcMultiScore() {
    const kids = parseInt(document.getElementById('multi-kids').value);
    const is3Gen = document.getElementById('multi-3gen').checked;
    const total = 40 + kids + (is3Gen ? 5 : 0);
    document.getElementById('multi-score-display').innerText = total + "점";
}

/**
 * Shin-hui-ta Profit Share Simulator
 */
function initShinhuitaSimulator() {
    document.querySelectorAll('.st-calc').forEach(el => {
        el.addEventListener('input', updateProfitShare);
    });
    updateProfitShare();
}

function updateProfitShare() {
    const ltv = parseInt(document.getElementById('st-ltv').value);
    const kidsInput = document.querySelector('input[name="st-kids"]:checked');
    const kids = kidsInput ? parseInt(kidsInput.value) : 2;

    document.getElementById('st-ltv-val').innerText = ltv + "%";

    let share = 50;
    if (ltv <= 30) share = 10;
    else if (ltv <= 50) share = 30;

    const discount = kids >= 2 ? 20 : (kids === 1 ? 10 : 0);
    share = Math.max(10, share - discount);

    document.getElementById('share-percent').innerText = share + "%";
    
    // Ring Animation (Total 690 dasharray)
    const visualPercent = share * 2; 
    const offset = 690 - (690 * (visualPercent / 100));
    const ring = document.getElementById('profit-ring');
    ring.style.strokeDashoffset = offset;
    ring.style.stroke = share > 30 ? '#EF4444' : '#F59E0B';

    const comment = document.getElementById('share-comment');
    if (share > 30) {
        comment.innerText = "수익 반납 비율이 높음 (비추천)";
        comment.style.color = "#EF4444";
    } else {
        comment.innerText = "합리적인 자금 계획 (추천)";
        comment.style.color = "#1E3A8A";
    }
}

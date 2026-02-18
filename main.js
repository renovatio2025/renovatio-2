document.addEventListener('DOMContentLoaded', () => {
    initSupplyChart();
    initTabs();
    initCalculators();
    updateProfitShare();
});

/**
 * Supply Ratio Chart - Clean Original Style
 */
function initSupplyChart() {
    const canvas = document.getElementById('supplyRatioChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['특별공급 (80%)', '일반공급 (20%)'],
            datasets: [{
                data: [80, 20],
                backgroundColor: ['#2C3E50', '#E5E7EB'],
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
                        padding: 20, 
                        font: { family: '"Noto Sans KR"', size: 12, weight: '500' } 
                    } 
                }
            }
        }
    });
}

/**
 * Tab Switching Logic
 */
function initTabs() {
    const tabMapping = {
        'btn-multi-child': 'tab-multi-child',
        'btn-newlywed': 'tab-newlywed',
        'btn-first-life': 'tab-first-life',
        'btn-newborn': 'tab-newborn'
    };

    Object.keys(tabMapping).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (!btn) return;

        btn.addEventListener('click', () => {
            // UI Update
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Content Update
            document.querySelectorAll('.tab-content').forEach(c => {
                c.classList.add('hidden');
                c.classList.remove('block');
            });
            const activeContent = document.getElementById(tabMapping[btnId]);
            activeContent.classList.remove('hidden');
            activeContent.classList.add('block');
        });
    });
}

/**
 * Calculators Initialization
 */
function initCalculators() {
    // Multi-child Calculation
    document.querySelectorAll('.mc-calc').forEach(el => {
        el.addEventListener('change', () => {
            const kids = parseInt(document.getElementById('mc-kids').value);
            const baby = parseInt(document.getElementById('mc-baby').value);
            const nohouse = parseInt(document.getElementById('mc-nohouse').value);
            document.getElementById('mc-result').innerText = (kids + baby + nohouse) + "점";
        });
    });

    // Newlywed Calculation
    document.querySelectorAll('.nw-calc').forEach(el => {
        el.addEventListener('change', () => {
            const kids = parseInt(document.getElementById('nw-kids').value);
            const reside = parseInt(document.getElementById('nw-reside').value);
            const bank = parseInt(document.getElementById('nw-bank').value);
            document.getElementById('nw-result').innerText = (kids + reside + bank + 4) + "점"; // Base + Inputs
        });
    });

    // Newborn Calculation
    document.querySelectorAll('.nb-calc').forEach(el => {
        el.addEventListener('change', () => {
            const kids = parseInt(document.getElementById('nb-kids').value);
            const reside = parseInt(document.getElementById('nb-reside').value);
            document.getElementById('nb-result').innerText = (kids + reside + 4) + "점";
        });
    });

    // Simulator
    document.querySelectorAll('.st-calc').forEach(el => {
        el.addEventListener('input', updateProfitShare);
    });
}

/**
 * Shin-hui-ta Simulator Logic
 */
function updateProfitShare() {
    const ltv = parseInt(document.getElementById('st-ltv').value);
    const years = parseInt(document.getElementById('st-years').value);
    const kids = parseInt(document.querySelector('input[name="st-kids"]:checked').value);

    document.getElementById('st-ltv-val').innerText = ltv + "%";
    document.getElementById('st-years-val').innerText = years + "년";

    // Standard Profit Share Matrix Logic
    let share = 50;
    if (ltv <= 30) share = 10;
    else if (ltv <= 50) share = 30;

    const discount = kids >= 2 ? 20 : (kids === 1 ? 10 : 0);
    share = Math.max(10, share - discount);

    document.getElementById('share-percent').innerText = share + "%";
    
    // Ring Animation (Dasharray 628)
    const visualOffset = 628 - (628 * (share * 2 / 100)); // Map 50% to full visual ring
    const ring = document.getElementById('profit-ring');
    ring.style.strokeDashoffset = visualOffset;
    ring.style.stroke = share > 30 ? '#EF4444' : '#D97706';

    const comment = document.getElementById('share-comment');
    if (share > 30) {
        comment.innerText = "수익 반납 비율이 높습니다.";
        comment.style.color = "#EF4444";
    } else {
        comment.innerText = "추천하는 전략입니다.";
        comment.style.color = "#2C3E50";
    }
}

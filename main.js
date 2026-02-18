document.addEventListener('DOMContentLoaded', () => {
    initSupplyChart();
    initTabs();
    initCalculators();
    updateProfitShare();
});

/**
 * Supply Ratio Chart - Original Style Restored
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
            cutout: '80%',
            plugins: {
                legend: { 
                    position: 'bottom', 
                    labels: { 
                        padding: 30, 
                        font: { family: '"Noto Sans KR"', size: 12, weight: '700' },
                        color: '#2C3E50'
                    } 
                },
                tooltip: { 
                    padding: 20,
                    backgroundColor: '#2C3E50',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 }
                }
            }
        }
    });
}

/**
 * Tab Navigation Logic
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
    // Multi-child
    document.querySelectorAll('.mc-calc').forEach(el => {
        el.addEventListener('change', () => {
            const kids = parseInt(document.getElementById('mc-kids').value);
            const baby = parseInt(document.getElementById('mc-baby').value);
            const nohouse = parseInt(document.getElementById('mc-nohouse').value);
            document.getElementById('mc-result').innerText = (kids + baby + nohouse);
        });
    });

    // Newlywed
    document.querySelectorAll('.nw-calc').forEach(el => {
        el.addEventListener('change', () => {
            const kids = parseInt(document.getElementById('nw-kids').value);
            const reside = parseInt(document.getElementById('nw-reside').value);
            const bank = parseInt(document.getElementById('nw-bank').value);
            document.getElementById('nw-result').innerText = (kids + reside + bank + 4);
        });
    });

    // Newborn
    document.querySelectorAll('.nb-calc').forEach(el => {
        el.addEventListener('change', () => {
            const kids = parseInt(document.getElementById('nb-kids').value);
            const reside = parseInt(document.getElementById('nb-reside').value);
            document.getElementById('nb-result').innerText = (kids + reside + 4);
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
    const kidsInput = document.querySelector('input[name="st-kids"]:checked');
    const kids = kidsInput ? parseInt(kidsInput.value) : 2;

    document.getElementById('st-ltv-val').innerText = ltv + "%";
    document.getElementById('st-years-val').innerText = years + "년";

    // Matrix Approximation
    let share = 50;
    if (ltv <= 30) share = 10;
    else if (ltv <= 50) share = 30;

    const discount = kids >= 2 ? 20 : (kids === 1 ? 10 : 0);
    share = Math.max(10, share - discount);

    document.getElementById('share-percent').innerText = share + "%";
    
    // Ring Animation (Total 754 dasharray)
    const visualPercent = share * 2; 
    const offset = 754 - (754 * (visualPercent / 100));
    const ring = document.getElementById('profit-ring');
    ring.style.strokeDashoffset = offset;
    ring.style.stroke = share > 30 ? '#EF4444' : '#D97706';

    const comment = document.getElementById('share-comment');
    if (share > 30) {
        comment.innerText = "수익 반납 비율이 높음";
        comment.style.color = "#EF4444";
    } else {
        comment.innerText = "추천하는 전략입니다.";
        comment.style.color = "#2C3E50";
    }
}

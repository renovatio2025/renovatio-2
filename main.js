document.addEventListener('DOMContentLoaded', () => {
    initSupplyChart();
    initTabs();
    initCalculators();
    updateProfitShare(); // Initial calc for simulator
});

/**
 * Supply Ratio Chart
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
                backgroundColor: ['#2C3E50', '#D1D5DB'],
                hoverBackgroundColor: ['#1A252F', '#9CA3AF'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: { 
                    position: 'bottom', 
                    labels: { 
                        padding: 20, 
                        font: { family: '"Noto Sans KR"', size: 12 } 
                    } 
                },
                tooltip: { 
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw}% (전략적 핵심)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Tab Navigation
 */
function initTabs() {
    const tabs = {
        'btn-multi-child': 'tab-multi-child',
        'btn-newlywed': 'tab-newlywed',
        'btn-first-life': 'tab-first-life',
        'btn-newborn': 'tab-newborn'
    };

    Object.keys(tabs).forEach(btnId => {
        document.getElementById(btnId).addEventListener('click', () => {
            // Deactivate all
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('block');
            });

            // Activate current
            document.getElementById(btnId).classList.add('active');
            const content = document.getElementById(tabs[btnId]);
            content.classList.remove('hidden');
            content.classList.add('block');
        });
    });
}

/**
 * Calculators Logic
 */
function initCalculators() {
    // Multi-child
    document.querySelectorAll('.mc-calc').forEach(el => {
        el.addEventListener('change', calcMultiChild);
    });

    // Newlywed
    document.querySelectorAll('.nw-calc').forEach(el => {
        el.addEventListener('change', calcNewlywed);
    });
    document.querySelectorAll('input[name="nw-type"]').forEach(el => {
        el.addEventListener('change', toggleNewlywedType);
    });

    // Newborn
    document.querySelectorAll('.nb-calc').forEach(el => {
        el.addEventListener('change', calcNewborn);
    });

    // Shin-hui-ta Simulator
    document.querySelectorAll('.st-calc').forEach(el => {
        el.addEventListener('input', updateProfitShare);
    });
}

function calcMultiChild() {
    const kids = parseInt(document.getElementById('mc-kids').value);
    const baby = parseInt(document.getElementById('mc-baby').value);
    const generation = parseInt(document.getElementById('mc-generation').value);
    const nohouse = parseInt(document.getElementById('mc-nohouse').value);
    const reside = parseInt(document.getElementById('mc-reside').value);
    const bank = parseInt(document.getElementById('mc-bank').value);
    
    const score = kids + baby + generation + nohouse + reside + bank;
    
    document.getElementById('mc-result').innerText = score + "점";
    const comment = document.getElementById('mc-comment');
    if (score >= 80) {
        comment.innerText = "안정권입니다! (80점 이상)";
        comment.className = "text-xs text-right text-green-600 font-bold mt-1";
    } else {
        comment.innerText = "80~85점이 안정권입니다.";
        comment.className = "text-xs text-right text-red-500 mt-1";
    }
}

function toggleNewlywedType() {
    const isSingle = document.querySelector('input[name="nw-type"][value="single"]').checked;
    const inputMarry = document.getElementById('input-marry');
    const inputSingle = document.getElementById('input-single');
    const labelNew = document.getElementById('label-newlywed');
    const labelSingle = document.getElementById('label-single');

    if (isSingle) {
        inputMarry.classList.add('hidden');
        inputSingle.classList.remove('hidden');
        labelNew.classList.remove('bg-secondary', 'text-white');
        labelNew.classList.add('hover:bg-gray-100');
        labelSingle.classList.add('bg-secondary', 'text-white');
        labelSingle.classList.remove('hover:bg-gray-100');
    } else {
        inputMarry.classList.remove('hidden');
        inputSingle.classList.add('hidden');
        labelNew.classList.add('bg-secondary', 'text-white');
        labelNew.classList.remove('hover:bg-gray-100');
        labelSingle.classList.remove('bg-secondary', 'text-white');
        labelSingle.classList.add('hover:bg-gray-100');
    }
    calcNewlywed();
}

function calcNewlywed() {
    const income = parseInt(document.getElementById('nw-income').value);
    const kids = parseInt(document.getElementById('nw-kids').value);
    const reside = parseInt(document.getElementById('nw-reside').value);
    const bank = parseInt(document.getElementById('nw-bank').value);
    
    const isSingle = document.querySelector('input[name="nw-type"][value="single"]').checked;
    let lastScore = isSingle 
        ? parseInt(document.getElementById('nw-single-age').value)
        : parseInt(document.getElementById('nw-marry').value);

    const score = income + kids + reside + bank + lastScore;
    document.getElementById('nw-result').innerText = score + "점";
    
    const comment = document.getElementById('nw-comment');
    if (score >= 11) {
        comment.innerText = "당첨 가능성이 높습니다 (11점 이상)";
        comment.className = "text-xs text-right text-green-600 font-bold mt-1";
    } else {
        comment.innerText = "11점 이상을 목표로 전략을 수정하세요.";
        comment.className = "text-xs text-right text-red-500 mt-1";
    }
}

function calcNewborn() {
    const income = parseInt(document.getElementById('nb-income').value);
    const kids = parseInt(document.getElementById('nb-kids').value);
    const reside = parseInt(document.getElementById('nb-reside').value);
    const bank = parseInt(document.getElementById('nb-bank').value);

    const score = income + kids + reside + bank;
    document.getElementById('nb-result').innerText = score + "점";

    const comment = document.getElementById('nb-comment');
    if (score >= 8) {
        comment.innerText = "매우 유망합니다 (8~9점 안정권)";
        comment.className = "text-xs text-right text-green-600 font-bold mt-1";
    } else {
        comment.innerText = "조금 더 점수 관리가 필요합니다.";
        comment.className = "text-xs text-right text-orange-500 mt-1";
    }
}

function updateProfitShare() {
    const ltv = parseInt(document.getElementById('st-ltv').value);
    const years = parseInt(document.getElementById('st-years').value);
    const kids = parseInt(document.querySelector('input[name="st-kids"]:checked').value);

    document.getElementById('st-ltv-val').innerText = ltv + "%";
    document.getElementById('st-years-val').innerText = years + "년";

    let calculatedShare = 50; 
    if (ltv <= 30) calculatedShare = 10;
    else if (ltv <= 50) calculatedShare = 30;
    else calculatedShare = 50;

    const kidDiscount = kids >= 2 ? 20 : (kids === 1 ? 10 : 0);
    calculatedShare -= kidDiscount;

    if (calculatedShare < 10) calculatedShare = 10;
    if (calculatedShare > 50) calculatedShare = 50;

    document.getElementById('share-percent').innerText = calculatedShare + "%";
    
    const visualPercent = calculatedShare * 2; 
    const visualOffset = 552 - (552 * (visualPercent / 100));
    
    const ring = document.getElementById('profit-ring');
    ring.style.strokeDashoffset = visualOffset;
    ring.style.stroke = calculatedShare > 30 ? '#EF4444' : '#556B2F';

    const commEl = document.getElementById('share-comment');
    if (calculatedShare > 30) {
        commEl.innerText = "⚠️ 비추천: 수익 공유 비율이 너무 높습니다.";
        commEl.className = "mt-6 text-center font-bold text-red-500";
    } else {
        commEl.innerText = "✅ 추천: 합리적인 전략입니다.";
        commEl.className = "mt-6 text-center font-bold text-green-600";
    }
}

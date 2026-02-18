document.addEventListener('DOMContentLoaded', () => {
    initSupplyChart();
    initTabs();
    initCalculators();
    updateProfitShare();
    initScrollAnimations();
});

/**
 * Supply Ratio Chart with Premium Styling
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
                backgroundColor: ['#C5A059', '#1A252F'], // Accent vs Navy
                hoverOffset: 20,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%',
            plugins: {
                legend: { 
                    position: 'right', 
                    labels: { 
                        padding: 40, 
                        font: { family: '"Noto Sans KR"', size: 12, weight: '700' },
                        color: '#1A252F'
                    } 
                },
                tooltip: { 
                    padding: 20,
                    backgroundColor: '#1A252F',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 }
                }
            }
        }
    });
}

/**
 * Tab Navigation for Premium Design
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
            // Update buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-premium'));
            btn.classList.add('active-premium');

            // Update content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('block');
            });
            const activeContent = document.getElementById(tabMapping[btnId]);
            activeContent.classList.remove('hidden');
            activeContent.classList.add('block');
        });
    });
}

/**
 * Calculators with Score Feedback
 */
function initCalculators() {
    // Multi-child
    document.querySelectorAll('.mc-calc').forEach(el => el.addEventListener('change', () => {
        const kids = parseInt(document.getElementById('mc-kids').value);
        const baby = parseInt(document.getElementById('mc-baby').value);
        const nohouse = parseInt(document.getElementById('mc-nohouse').value);
        const score = kids + baby + nohouse;
        
        document.getElementById('mc-result').innerText = score;
        const comment = document.getElementById('mc-comment');
        comment.innerText = score >= 80 ? "안정권 (Excellent)" : "관리 필요 (Monitor)";
        comment.style.color = score >= 80 ? "#556B2F" : "#C5A059";
    }));

    // Newlywed
    document.querySelectorAll('.nw-calc').forEach(el => el.addEventListener('change', () => {
        const kids = parseInt(document.getElementById('nw-kids').value);
        const reside = parseInt(document.getElementById('nw-reside').value);
        const bank = parseInt(document.getElementById('nw-bank').value);
        const score = kids + reside + bank + 3; // base points
        
        document.getElementById('nw-result').innerText = score;
        const comment = document.getElementById('nw-comment');
        comment.innerText = score >= 11 ? "추천 유형 (High Chance)" : "전략 확인 (Check Strategy)";
        comment.style.color = score >= 11 ? "#556B2F" : "#C5A059";
    }));

    // Newborn
    document.querySelectorAll('.nb-calc').forEach(el => el.addEventListener('change', () => {
        const kids = parseInt(document.getElementById('nb-kids').value);
        const reside = parseInt(document.getElementById('nb-reside').value);
        const score = kids + reside + 4; // base points
        
        document.getElementById('nb-result').innerText = score;
        const comment = document.getElementById('nb-comment');
        comment.innerText = score >= 8 ? "최상위 기회 (Top Opportunity)" : "양호 (Good)";
    }));

    // Simulator
    document.querySelectorAll('.st-calc').forEach(el => el.addEventListener('input', updateProfitShare));
}

function updateProfitShare() {
    const ltv = parseInt(document.getElementById('st-ltv').value);
    const years = parseInt(document.getElementById('st-years').value);
    const kids = parseInt(document.querySelector('input[name="st-kids"]:checked').value);

    document.getElementById('st-ltv-val').innerText = ltv + "%";
    document.getElementById('st-years-val').innerText = years + "년";

    // Simplified Profit Share Logic
    let baseShare = ltv >= 70 ? 50 : (ltv >= 50 ? 30 : 10);
    const discount = kids >= 2 ? 20 : (kids === 1 ? 10 : 0);
    let share = Math.max(10, baseShare - discount);

    // UI Updates
    document.getElementById('share-percent').innerText = share + "%";
    
    // Ring Animation (Total dasharray 880)
    const visualPercent = share * 2; // Map 0-50% to 0-100% for impact
    const offset = 880 - (880 * (visualPercent / 100));
    const ring = document.getElementById('profit-ring');
    ring.style.strokeDashoffset = offset;
    ring.style.stroke = share > 30 ? '#EF4444' : '#C5A059';

    const comment = document.getElementById('share-comment');
    if (share > 30) {
        comment.innerText = "비추천: 수익 반납 비율이 높음";
        comment.classList.replace('bg-primary', 'bg-red-500');
    } else {
        comment.innerText = "추천: 효율적인 자금 계획";
        comment.classList.replace('bg-red-500', 'bg-primary');
    }
}

/**
 * Scroll Micro-interactions
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 1s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(section);
    });
}

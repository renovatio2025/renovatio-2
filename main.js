document.addEventListener('DOMContentLoaded', () => {
    initGlobalPaging();
    initPage1Logic();
    initPage2Logic();
});

/**
 * GLOBAL PAGE SWITCHING
 */
function initGlobalPaging() {
    const nav1 = document.getElementById('nav-page-1');
    const nav2 = document.getElementById('nav-page-2');
    const page1 = document.getElementById('page-1');
    const page2 = document.getElementById('page-2');

    nav1.addEventListener('click', () => {
        nav1.classList.add('active-page', 'font-bold', 'text-sage-primary', 'border-sage-primary');
        nav1.classList.remove('text-gray-400', 'border-transparent');
        nav2.classList.remove('active-page', 'font-bold', 'text-blue-primary', 'border-blue-primary');
        nav2.classList.add('text-gray-400', 'border-transparent');

        page1.classList.remove('hidden');
        page1.classList.add('block');
        page2.classList.add('hidden');
        page2.classList.remove('block');
    });

    nav2.addEventListener('click', () => {
        nav2.classList.add('active-page', 'font-bold', 'text-blue-primary', 'border-blue-primary');
        nav2.classList.remove('text-gray-400', 'border-transparent');
        nav1.classList.remove('active-page', 'font-bold', 'text-sage-primary', 'border-sage-primary');
        nav1.classList.add('text-gray-400', 'border-transparent');

        page2.classList.remove('hidden');
        page2.classList.add('block');
        page1.classList.add('hidden');
        page1.classList.remove('block');
    });
}

/**
 * PAGE 1: SAGE ANALYZER LOGIC (FULL RESTORE)
 */
function initPage1Logic() {
    initSageChart();
    initSageTabs();
    initSageCalculators();
    initSageShinhuita();
}

function initSageChart() {
    const ctx = document.getElementById('sage-supplyChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['특별공급 (80%)', '일반공급 (20%)'],
            datasets: [{
                data: [80, 20],
                backgroundColor: ['#2C3E50', '#E5E7EB'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '80%', plugins: { legend: { position: 'bottom' } } }
    });
}

function initSageTabs() {
    const tabs = { 'sage-btn-multi': 'sage-tab-multi', 'sage-btn-newlywed': 'sage-tab-newlywed', 'sage-btn-newborn': 'sage-tab-newborn' };
    Object.keys(tabs).forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            document.querySelectorAll('.sage-tab-btn').forEach(b => b.classList.remove('active', 'font-bold', 'border-sage-primary'));
            document.getElementById(id).classList.add('active', 'font-bold');
            document.querySelectorAll('.sage-tab-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(tabs[id]).classList.remove('hidden');
        });
    });
}

function initSageCalculators() {
    // Multi-child
    document.querySelectorAll('.s-mc-calc').forEach(el => el.addEventListener('change', () => {
        const kids = parseInt(document.getElementById('s-mc-kids').value);
        const baby = parseInt(document.getElementById('s-mc-baby').value);
        const nohouse = parseInt(document.getElementById('s-mc-nohouse').value);
        const reside = parseInt(document.getElementById('s-mc-reside').value);
        const bank = parseInt(document.getElementById('s-mc-bank').value);
        document.getElementById('s-mc-result').innerText = (kids + baby + nohouse + reside + bank) + "점";
    }));

    // Newlywed
    document.querySelectorAll('.s-nw-calc').forEach(el => el.addEventListener('change', () => {
        const income = parseInt(document.getElementById('s-nw-income').value);
        const kids = parseInt(document.getElementById('s-nw-kids').value);
        const reside = parseInt(document.getElementById('s-nw-reside').value);
        const bank = parseInt(document.getElementById('s-nw-bank').value);
        const marry = parseInt(document.getElementById('s-nw-marry').value);
        document.getElementById('s-nw-result').innerText = (income + kids + reside + bank + marry) + "점";
    }));

    // Newborn
    document.querySelectorAll('.s-nb-calc').forEach(el => el.addEventListener('change', () => {
        const income = parseInt(document.getElementById('s-nb-income').value);
        const kids = parseInt(document.getElementById('s-nb-kids').value);
        const reside = parseInt(document.getElementById('s-nb-reside').value);
        const bank = parseInt(document.getElementById('s-nb-bank').value);
        document.getElementById('s-nb-result').innerText = (income + kids + reside + bank) + "점";
    }));
}

function initSageShinhuita() {
    document.querySelectorAll('.s-st-calc').forEach(el => el.addEventListener('input', updateSageProfitShare));
    updateSageProfitShare();
}

function updateSageProfitShare() {
    const ltv = parseInt(document.getElementById('s-st-ltv').value);
    const kids = parseInt(document.querySelector('input[name="s-st-kids"]:checked').value);
    document.getElementById('s-st-ltv-val').innerText = ltv + "%";
    let share = 50;
    if (ltv <= 30) share = 10;
    else if (ltv <= 50) share = 30;
    share = Math.max(10, share - (kids >= 2 ? 20 : (kids === 1 ? 10 : 0)));
    document.getElementById('s-share-percent').innerText = share + "%";
    document.getElementById('s-profit-ring').style.strokeDashoffset = 690 - (690 * (share * 2 / 100));
}

/**
 * PAGE 2: BLUE CENTER LOGIC
 */
function initPage2Logic() {
    initBlueChart();
    initBlueSubTabs();
}

function initBlueChart() {
    const ctx = document.getElementById('blue-supplyChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['특별공급 (70%)', '일반공급 (30%)'],
            datasets: [{
                data: [70, 30],
                backgroundColor: ['#1E3A8A', '#E5E7EB'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, maintainAspectRatio: false, cutout: '75%', plugins: { legend: { position: 'bottom' } } }
    });
}

function initBlueSubTabs() {
    const navs = { 'nav-blue-dash': 'blue-dash', 'nav-blue-pitfalls': 'blue-pitfalls', 'nav-blue-secrets': 'blue-secrets' };
    Object.keys(navs).forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            document.querySelectorAll('#page-2 button').forEach(b => b.classList.remove('blue-nav-active'));
            document.getElementById(id).classList.add('blue-nav-active');
            document.querySelectorAll('.blue-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(navs[id]).classList.remove('hidden');
        });
    });
}

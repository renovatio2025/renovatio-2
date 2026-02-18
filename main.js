document.addEventListener('DOMContentLoaded', () => {
    initGlobalNavigation();
    
    // Module A: Sage Analyzer Init
    initSageModule();
    
    // Module B: Blue Center Init
    initBlueModule();
});

/**
 * GLOBAL NAVIGATION: Switching between Modules
 */
function initGlobalNavigation() {
    const analyzerBtn = document.getElementById('global-nav-analyzer');
    const centerBtn = document.getElementById('global-nav-center');
    const analyzerMod = document.getElementById('module-analyzer');
    const centerMod = document.getElementById('module-center');

    analyzerBtn.addEventListener('click', () => {
        // UI
        analyzerBtn.classList.add('active-global', 'border-sage-secondary', 'text-sage-secondary');
        analyzerBtn.classList.remove('border-transparent', 'text-gray-500');
        centerBtn.classList.remove('active-global', 'border-blue-primary', 'text-blue-primary');
        centerBtn.classList.add('border-transparent', 'text-gray-500');

        // Content
        analyzerMod.classList.remove('hidden');
        analyzerMod.classList.add('block');
        centerMod.classList.add('hidden');
        centerMod.classList.remove('block');
    });

    centerBtn.addEventListener('click', () => {
        // UI
        centerBtn.classList.add('active-global', 'border-blue-primary', 'text-blue-primary');
        centerBtn.classList.remove('border-transparent', 'text-gray-500');
        analyzerBtn.classList.remove('active-global', 'border-sage-secondary', 'text-sage-secondary');
        analyzerBtn.classList.add('border-transparent', 'text-gray-500');

        // Content
        centerMod.classList.remove('hidden');
        centerMod.classList.add('block');
        analyzerMod.classList.add('hidden');
        analyzerMod.classList.remove('block');
    });
}

/**
 * MODULE A: SAGE ANALYZER LOGIC
 */
function initSageModule() {
    initSageChart();
    initSageShinhuita();
}

function initSageChart() {
    const ctx = document.getElementById('sage-supplyRatioChart').getContext('2d');
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

function initSageShinhuita() {
    document.querySelectorAll('.st-calc-sage').forEach(el => {
        el.addEventListener('input', updateSageProfitShare);
    });
    updateSageProfitShare();
}

function updateSageProfitShare() {
    const ltv = parseInt(document.getElementById('sage-st-ltv').value);
    const kids = parseInt(document.querySelector('input[name="sage-st-kids"]:checked').value);
    document.getElementById('sage-st-ltv-val').innerText = ltv + "%";

    let share = 50;
    if (ltv <= 30) share = 10;
    else if (ltv <= 50) share = 30;
    share = Math.max(10, share - (kids >= 2 ? 20 : (kids === 1 ? 10 : 0)));

    document.getElementById('sage-share-percent').innerText = share + "%";
    const ring = document.getElementById('sage-profit-ring');
    ring.style.strokeDashoffset = 690 - (690 * (share * 2 / 100));
}

/**
 * MODULE B: BLUE CENTER LOGIC
 */
function initBlueModule() {
    initBlueChart();
    initBlueTabs();
    initBlueCalculators();
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

function initBlueTabs() {
    // Sub-tab logic for Module B
    const navItems = {
        'nav-center-dashboard': 'center-dashboard',
        'nav-center-strategies': 'center-strategies',
        'nav-center-pitfalls': 'center-pitfalls',
        'nav-center-secrets': 'center-secrets'
    };

    Object.keys(navItems).forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            document.querySelectorAll('.center-nav-item').forEach(el => el.classList.remove('center-nav-active'));
            document.getElementById(id).classList.add('center-nav-active');
            document.querySelectorAll('.center-tab-content').forEach(el => el.classList.add('hidden'));
            document.getElementById(navItems[id]).classList.remove('hidden');
        });
    });

    // Strategy sub-tabs
    const stratBtns = {
        'blue-btn-multi': 'blue-strat-multi',
        'blue-btn-newlywed': 'blue-strat-newlywed',
        'blue-btn-newborn': 'blue-strat-newborn'
    };

    Object.keys(stratBtns).forEach(id => {
        document.getElementById(id).addEventListener('click', () => {
            document.querySelectorAll('.blue-strat-btn').forEach(el => el.classList.remove('blue-active-strat', 'text-blue-primary'));
            document.getElementById(id).classList.add('blue-active-strat');
            document.querySelectorAll('.blue-strat-detail').forEach(el => el.classList.add('hidden'));
            document.getElementById(stratBtns[id]).classList.remove('hidden');
        });
    });
}

function initBlueCalculators() {
    const calcInputs = ['blue-multi-kids', 'blue-multi-3gen'];
    calcInputs.forEach(id => {
        document.getElementById(id).addEventListener('change', calcBlueMulti);
    });
    calcBlueMulti();
}

function calcBlueMulti() {
    const kids = parseInt(document.getElementById('blue-multi-kids').value);
    const is3Gen = document.getElementById('blue-multi-3gen').checked;
    const total = 40 + kids + (is3Gen ? 5 : 0);
    document.getElementById('blue-multi-score-display').innerText = total + "점";
}

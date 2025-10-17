const historyEl = document.getElementById('history');

// إدارة السجل الذكي للمستخدم باستخدام localStorage
function loadHistory() {
    const saved = JSON.parse(localStorage.getItem('osaMemory') || '[]'); 
    historyEl.innerHTML = '';
    saved.reverse().forEach(item => {
        const li = document.createElement('li');
        const displayPrompt = item.prompt.length > 40 ? item.prompt.substring(0, 40) + '...' : item.prompt;
        li.innerHTML = `<strong>سؤال:</strong> ${displayPrompt} → <span style="font-size:12px;">[${item.source}]</span>`;
        historyEl.appendChild(li);
    });
}

function saveHistory(prompt, response, source) {
    let saved = JSON.parse(localStorage.getItem('osaMemory') || '[]');
    saved.push({ 
        prompt, 
        response, 
        source, 
        timestamp: new Date().toISOString() 
    });
    if (saved.length > 100) { 
        saved.shift(); // احتفظ بآخر 100 سجل
    }
    localStorage.setItem('osaMemory', JSON.stringify(saved));
    loadHistory();
}

document.addEventListener('DOMContentLoaded', loadHistory);

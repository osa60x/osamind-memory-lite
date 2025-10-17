// app.js - منطق الواجهة والاتصال بالـ Worker
// يتطلب وجود WORKER_API_URL من ملف config.js

const sendBtn = document.getElementById('sendBtn');
const promptEl = document.getElementById('prompt');
const responseEl = document.getElementById('response');

sendBtn.addEventListener('click', async () => {
    const prompt = promptEl.value.trim();
    if (!prompt) return;

    responseEl.innerHTML = 'جاري المعالجة والتنسيق... 🔄';
    sendBtn.disabled = true;

    try {
        const start = performance.now();
        const res = await fetch(WORKER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: prompt, user_id: 'local_user_001' }) 
        });
        const latency = (performance.now() - start).toFixed(0);
        const data = await res.json();

        if (data.error) {
            responseEl.innerHTML = `❌ خطأ في النظام: ${data.error}<br><em>(يرجى التأكد من رابط Worker)</em>`;
        } else {
            const source = data.source || 'Workers AI';
            responseEl.innerHTML = `<strong>OsaMind:</strong> ${data.text}<br><br><em>المصدر: ${source} - زمن الاستجابة: ${latency}ms</em>`;
            
            // حفظ الإجابة في الذاكرة المباشرة للمستخدم
            saveHistory(prompt, data.text, source);
        }
    } catch (err) {
        responseEl.innerHTML = `❌ حدث خطأ في الاتصال بالمنسق. يرجى مراجعة الشبكة.`;
    } finally {
        sendBtn.disabled = false;
    }
});

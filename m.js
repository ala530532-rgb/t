const scriptURL = 'https://script.google.com/macros/s/AKfycbz3LokWW3MqoY-n0sso78DAMCMYT8SlXlIr8JpBEkCkXYPJ3bFm6h0gKmE55PRUwiHs/exec';

function fetchMessages() {
    // نبحث عن الحاوية بأكثر من اسم محتمل لتفادي أي خطأ
    const container = document.getElementById('messagesContainer') || document.querySelector('.content') || document.body;
    const loading = document.getElementById('loading');
    
    if (loading) loading.style.display = 'none';

    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            // لو العنصر الرئيسي هو الـ body أو الحاوية، نحافظ على العنوان ونفرغ الرسائل القديمة فقط
            let targetDiv = document.getElementById('messagesContainer');
            if (!targetDiv) {
                targetDiv = document.createElement('div');
                targetDiv.id = 'messagesContainer';
                container.appendChild(targetDiv);
            }
            targetDiv.innerHTML = "";

            if (!data || data.length === 0) {
                targetDiv.innerHTML = "<p style='text-align:center;'>لا توجد تهاني حتى الآن..</p>";
                return;
            }

            data.reverse().forEach(row => {
                let keys = Object.keys(row);
                let guestName = row[keys[0]] || 'ضيف كريم';
                let guestMsg = row[keys[1]] || 'لا توجد رسالة';
                let guestStatus = row[keys[2]] || 'أؤكد الحضور';
                let timeSend = row[keys[3]] || '';

                let statusClass = String(guestStatus).includes('أعتذر') || String(guestStatus).includes('اعتذر') ? 'declining' : 'attending';

                let card = `
                    <div class="msg-card">
                        <span class="time">${timeSend}</span>
                        <div class="msg-name">${guestName}</div>
                        <span class="msg-status ${statusClass}">${guestStatus}</span>
                        <div class="msg-text">${guestMsg}</div>
                    </div>
                `;
                targetDiv.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

fetchMessages();
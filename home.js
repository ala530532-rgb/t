function submitRSVP() {
    let nameInput = document.getElementById('guestName');
    let messageInput = document.getElementById('guestMessage');
    let submitBtn = document.querySelector('button[onclick="submitRSVP()"]') || (event && event.target);
    
    let name = nameInput ? nameInput.value : '';
    let message = messageInput ? messageInput.value : '';
    
    if (!name || name.trim() === "") {
        alert("الرجاء كتابة الاسم الكريم");
        return;
    }

    // قراءة الحالة مباشرة وبكل دقة من القائمة المنسدلة الجديدة
    let statusElement = document.getElementById('attendanceSelect');
    let selectedAttendance = statusElement ? statusElement.value : "أؤكد الحضور";

    // تعطيل الزر مؤقتاً لمنع التكرار
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "جاري الإرسال...";
    }

    let scriptURL = 'https://script.google.com/macros/s/AKfycby1SsVH_AsjTeOrrS1w2m8XvharsTsUoE09hEUr4aN5xDC0MxDiMgXngl1Ton594eoN/exec';

    let data = {
        name: name,
        status: selectedAttendance,
        message: message
    };

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (nameInput) nameInput.value = "";
        if (messageInput) messageInput.value = "";
        
        alert(`شكراً لكِ يا ${name} 🤍 تم تسجيل ردك بنجاح!`);
        
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "إرسال";
        }
    })
    .catch(error => {
        console.error('Error!', error);
        alert("حدث خطأ، يرجى المحاولة مرة أخرى.");
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "إرسال";
        }
    });
}


const musicDisc = document.querySelector('.music');
const weddingMusic = document.getElementById('weddingMusic');

if (musicDisc && weddingMusic) {
    musicDisc.style.cursor = 'pointer';

    musicDisc.addEventListener('click', async () => {
        if (weddingMusic.paused) {
            try {
                await weddingMusic.play();
                musicDisc.classList.add('is-playing');
            } catch (error) {
                console.error('تعذر تشغيل الموسيقى:', error);
                alert('تعذر تشغيل الموسيقى، تأكدي من وجود ملف music.mp3');
            }
        } else {
            weddingMusic.pause();
            musicDisc.classList.remove('is-playing');
        }
    });
}
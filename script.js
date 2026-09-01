let currentLang = localStorage.getItem('site_lang') || 'ro';

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);

    // Smooth scroll pentru legături pe aceeași pagină
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('site_lang', lang);
    setLanguage(lang);
}

async function setLanguage(lang) {
    try {
        const response = await fetch(`${lang}.json`);
        const translations = await response.json();

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });

        // Actualizează starea butoanelor de limbă
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${lang}'`));
        });
    } catch (error) {
        console.error('Eroare la încărcarea fișierului de traducere:', error);
    }
}

// Reconstrucție dinamică pentru email
function revealEmail(button) {
    const container = button.parentElement;
    const user = container.getAttribute('data-u');
    const domain = container.getAttribute('data-d');
    const address = `${user}@${domain}`;
    
    container.innerHTML = `<a href="mailto:${address}" class="contact-link">${address}</a>`;
}

// Reconstrucție dinamică pentru telefon (Înlocuiește segmentele cu cifrele reale)
function revealPhone(button) {
    const container = button.parentElement;
    const p1 = container.getAttribute('data-p1');
    const p2 = container.getAttribute('data-p2'); // ex: "740"
    const p3 = container.getAttribute('data-p3'); // ex: "123"
    const p4 = container.getAttribute('data-p4'); // ex: "456"
    
    const fullNumber = `${p1} ${p2} ${p3} ${p4}`;
    const cleanNumber = `${p1}${p2}${p3}${p4}`;
    
    container.innerHTML = `<a href="tel:${cleanNumber}" class="contact-link">${fullNumber}</a>`;
}
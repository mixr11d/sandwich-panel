/* ==========================================================================
   1. إعدادات ومعرفات إعلانات جوجل (تعديل من مكان واحد لكل الموقع)
   ========================================================================== */
const G_ID = 'AW-xxxxxxxxxxx'; // ضع هنا معرف حساب إعلانات جوجل الجديد للعميل
const C_L = 'xxxxxxxxxxxxxx';    // ضع هنا لابل تتبع الاتصال الهاتفي الجديد للعميل
const W_L = 'xxxxxxxxxxxxxx';    // ضع هنا لابل تتبع نقرة الواتساب الجديد للعميل
const F_L = 'xxxxxxxxxxxxxx';    // ضع هنا لابل تتبع إرسال نموذج الطلب الجديد للعميل

/* ==========================================================================
   2. تحميل كود تتبع جوجل تلقائياً بعد اكتمال تحميل الصفحة لتسريع الـ FCP والـ LCP
   ========================================================================== */
window.addEventListener('load', function() {
    var gScript = document.createElement('script');
    gScript.async = true;
    gScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + G_ID;
    document.head.appendChild(gScript);
});

// إعدادات الـ dataLayer الافتراضية
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', G_ID);

/* ==========================================================================
   3. مستشعر رصد النقرات التلقائي لإعلانات جوجل (اتصال وواتساب)
   ========================================================================== */
document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;
    
    var href = a.href || '';
    
    // رصد نقرة الاتصال الهاتفي
    if (href.startsWith('tel:')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + C_L,
            'value': 50.0,
            'currency': 'SAR'
        });
    }
    
    // رصد نقرة الواتساب المباشرة
    if (href.includes('wa.me') || href.includes('whatsapp')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + W_L,
            'value': 40.0,
            'currency': 'SAR'
        });
    }
}, true);

/* ==========================================================================
   3.1 مستشعر رصد إرسال النموذج (برمجية خاصة لصفحة اتصل بنا)
   ========================================================================== */
document.addEventListener('submit', function(e) {
    // التأكد من أن النموذج المرسل هو نموذج الاتصال المطور لموقعك
    if (e.target && e.target.id === 'contactForm') {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + F_L,
            'value': 45.0,
            'currency': 'SAR'
        });
    }
});

/* ==========================================================================
   4. تفعيل وإغلاق قائمة الجوال (Hamburger Menu)
   ========================================================================== */
const menuToggle = document.getElementById('menuToggle') || document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); 
        navMenu.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });
}

/* ==========================================================================
   5. تشغيل زر الصعود للأعلى (Back To Top) بالاعتماد على Intersection Observer
   ========================================================================== */
const backToTopBtn = document.getElementById('backToTop');
const heroSection = document.querySelector('.hero');

if (backToTopBtn && heroSection) {
    backToTopBtn.style.display = 'none'; 

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                backToTopBtn.style.display = 'flex';
                setTimeout(() => {
                    backToTopBtn.classList.add('show');
                }, 10);
            } else {
                backToTopBtn.classList.remove('show');
                setTimeout(() => {
                    if (!backToTopBtn.classList.contains('show')) {
                        backToTopBtn.style.display = 'none';
                    }
                }, 250);
            }
        });
    }, { threshold: 0 }); 

    observer.observe(heroSection);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

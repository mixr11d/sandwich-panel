// --- CENTRALIZED CONFIGURATION ---
const G_ID = 'AW-18156640938'; // معرف حساب إعلانات جوجل للعميل
const C_L = '4DRaCIzqy8AcEKq14dFD';    // لابل تتبع الاتصال الهاتفي
const W_L = 'WC7nCI_qy8AcEKq14dFD';    // لابل تتبع نقرة الواتساب
const F_L = 'imx0CJ_6y8AcEKq14dFD';    // لابل تتبع إرسال نموذج الطلب

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
   3. مستشعر رصد النقرات التلقائي لإعلانات جوجل مع تفعيل خاصية الـ Beacon
   ========================================================================== */
document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;
    
    var href = a.href || '';
    
    // رصد نقرة الاتصال الهاتفي مع تفعيل الباكون لمنع فقدان البيانات
    if (href.startsWith('tel:')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + C_L,
            'value': 50.0,
            'currency': 'SAR',
            'transport_type': 'beacon' // يضمن الإرسال الفوري في الخلفية عند الانتقال للاتصال
        });
    }
    
    // رصد نقرة الواتساب المباشرة مع تفعيل الباكون لمنع فقدان البيانات
    if (href.includes('wa.me') || href.includes('whatsapp')) {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + W_L,
            'value': 40.0,
            'currency': 'SAR',
            'transport_type': 'beacon' // يضمن الإرسال الفوري في الخلفية عند فتح تطبيق الواتساب
        });
    }
}, true);

/* ==========================================================================
   3.1 مستشعر رصد إرسال النموذج (برمجية خاصة لصفحة اتصل بنا مع تفعيل الباكون)
   ========================================================================== */
document.addEventListener('submit', function(e) {
    // التأكد من أن النموذج المرسل هو نموذج الاتصال المطور لموقعك
    if (e.target && e.target.id === 'contactForm') {
        gtag('event', 'conversion', {
            'send_to': G_ID + '/' + F_L,
            'value': 45.0,
            'currency': 'SAR',
            'transport_type': 'beacon' // يضمن تسجيل الإحالة أثناء عملية التحويل التلقائي للواتساب
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

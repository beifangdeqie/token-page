// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 浮动目录功能
const floatingToc = document.getElementById('floatingToc');
const tocToggle = document.getElementById('tocToggle');
const tocItems = document.querySelectorAll('.toc-item');

if (tocToggle) {
    tocToggle.addEventListener('click', () => {
        floatingToc.classList.toggle('collapsed');
        document.body.classList.toggle('toc-collapsed');
    });
}

function updateActiveTocItem() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            tocItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// 返回顶部按钮
const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.step-card, .feature-card, .process-step, .flow-item, .commission-item, .faq-item, .guide-step, .action-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    updateActiveTocItem();
});

// 导航栏滚动效果
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }

    updateActiveTocItem();
    toggleBackToTop();

    lastScroll = currentScroll;
});

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('Token中转项目网站已加载');
console.log('联系方式：微信 Ya559890');

// 分享功能
const PAGE_URL = 'https://beifangdeqie.github.io/token-page/';
const PAGE_TITLE = 'Token中转代理 | 低成本使用Claude API，20%佣金返利';
const PAGE_DESC = '国内最省钱的Claude/ChatGPT API中转方案，邀请好友注册即享20%佣金返利，永久绑定。';

function copyLink() {
    navigator.clipboard.writeText(PAGE_URL).then(() => {
        const el = document.getElementById('shareLink');
        el.textContent = '✅ 链接已复制！直接粘贴发送给朋友即可';
        el.style.display = 'block';
        setTimeout(() => { el.style.display = 'none'; }, 3000);
    }).catch(() => {
        const el = document.getElementById('shareLink');
        el.textContent = '📋 手动复制：' + PAGE_URL;
        el.style.display = 'block';
    });
}

function shareToQQ() {
    const url = 'https://connect.qq.com/widget/shareqq/index.html?url=' + encodeURIComponent(PAGE_URL) + '&title=' + encodeURIComponent(PAGE_TITLE) + '&desc=' + encodeURIComponent(PAGE_DESC);
    window.open(url, '_blank', 'width=700,height=500');
}

function shareToWeibo() {
    const url = 'https://service.weibo.com/share/share.php?url=' + encodeURIComponent(PAGE_URL) + '&title=' + encodeURIComponent(PAGE_TITLE + ' - ' + PAGE_DESC);
    window.open(url, '_blank', 'width=700,height=500');
}

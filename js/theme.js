/**
 * Theme Toggle - 深色/淺色模式切換
 */
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // 初始化主題（從 localStorage 讀取或根據系統偏好，預設為深色）
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 預設為深色模式（與原有網站一致）
    if (savedTheme === 'light') {
        html.classList.remove('dark');
    } else {
        html.classList.add('dark');
    }
    
    // 切換按鈕事件
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

/**
 * Language Toggle - 語言切換
 * 正確處理不同頁面之間的語言切換，保持在相同的頁面結構
 * 支援本地開發環境和正式環境
 */
function initializeLanguageToggle() {
    const langToggle = document.querySelector('.lang-toggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const currentLang = document.documentElement.lang;
            let currentPathname = window.location.pathname;
            
            // 確保路徑以 / 結尾
            if (!currentPathname.endsWith('/')) {
                currentPathname += '/';
            }
            
            let newPath;
            
            // 檢測是否有 /portfolio/ 前綴（正式環境）
            const hasPortfolioPrefix = currentPathname.includes('/portfolio/');
            
            if (currentLang === 'en') {
                // 從英文切換到中文
                if (hasPortfolioPrefix) {
                    // 正式環境: /portfolio/xxx/ -> /portfolio/zh/xxx/
                    if (currentPathname === '/portfolio/') {
                        newPath = '/portfolio/zh/';
                    } else {
                        newPath = currentPathname.replace('/portfolio/', '/portfolio/zh/');
                    }
                } else {
                    // 本地開發環境: /xxx/ -> /zh/xxx/
                    if (currentPathname === '/') {
                        newPath = '/zh/';
                    } else {
                        newPath = '/zh' + currentPathname;
                    }
                }
            } else {
                // 從中文切換到英文
                if (hasPortfolioPrefix) {
                    // 正式環境: /portfolio/zh/xxx/ -> /portfolio/xxx/
                    newPath = currentPathname.replace('/portfolio/zh/', '/portfolio/');
                } else {
                    // 本地開發環境: /zh/xxx/ -> /xxx/
                    newPath = currentPathname.replace(/^\/zh\//, '/');
                    if (newPath === '') {
                        newPath = '/';
                    }
                }
            }
            
            // 標準化路徑
            newPath = newPath.replace(/\/+/g, '/');
            
            if (!newPath) {
                newPath = '/';
            }
            
            console.log(`[Language Toggle] ${currentLang} -> ${currentLang === 'en' ? 'zh' : 'en'}`);
            console.log(`[Path] ${currentPathname} -> ${newPath}`);
            console.log(`[Has Portfolio Prefix] ${hasPortfolioPrefix}`);
            
            // 儲存語言偏好
            localStorage.setItem('preferredLang', currentLang === 'en' ? 'zh' : 'en');
            
            // 執行跳轉
            window.location.href = newPath;
        });
    }
}

/**
 * Initialize All
 */
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeToggle();
    initializeLanguageToggle();
});

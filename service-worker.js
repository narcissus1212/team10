const CACHE_NAME = 'restaurant-pwa-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/pizza.jpg',
    '/images/burger.jpg',
    // أضف المزيد من المسارات إذا لزم الأمر
];

// تثبيت الـ Service Worker وتخزين الملفات في الـ Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                 console.log('✅ Caching files...');
                return cache.addAll(urlsToCache);
            })
    );
});
// تفعيل الـ Service Worker وحذف الكاش القديم
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('🗑️ Removing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
// تخزين البيانات في الـ Cache عند التفاعل مع الشبكة
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

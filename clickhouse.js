
   // const ANALYTICS_API = 'http://analytics.local/api/analytics';
   const ANALYTICS_API = 'http://adc39b9ed187548159822bbd781982b9-271722534.us-east-1.elb.amazonaws.com:3000/api/analytics';

   function generateUUID() {
       if (typeof crypto !== 'undefined' && crypto.randomUUID) {
           return crypto.randomUUID();
       } else {
           // Fallback UUID generator
           return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
               const r = (Math.random() * 16) | 0;
               const v = c === 'x' ? r : (r & 0x3) | 0x8;
               return v.toString(16);
           });
       }
   }

   const sessionId = (() => {
       let id = localStorage.getItem('sessionId');
       if (!id) {
           id = generateUUID();
           localStorage.setItem('sessionId', id);
       }
       return id;
   })();

    const pageUrl = window.location.pathname;

    // Detect device type
    function getDeviceType() {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
}

    const deviceType = getDeviceType();
    const pageStartTime = Date.now();

    // 1. Page View
    fetch(ANALYTICS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    eventType: 'page_view',
    pageUrl,
    sessionId,
    deviceType
})
});

    // 2. Clicks
    document.addEventListener('click', () => {
    fetch(ANALYTICS_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            eventType: 'click',
            pageUrl,
            sessionId,
            deviceType
        })
    });
});

    // 3. Scroll + Time on Page
    window.addEventListener('beforeunload', () => {
    const scrollDepth = Math.round(
    (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100
    );
    const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000); // in seconds

    navigator.sendBeacon(
    ANALYTICS_API,
    new Blob(
    [JSON.stringify({
    eventType: 'scroll_depth',
    pageUrl,
    sessionId,
    deviceType,
    scrollPercent: scrollDepth,
    timeOnPage: timeOnPage
})],
{ type: 'application/json' }
    )
    );
});


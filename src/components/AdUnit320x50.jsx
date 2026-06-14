import React, { useEffect, useRef } from 'react';

export default function AdUnitBottom320x50() {
const adRef = useRef(null);

useEffect(() => {
if (adRef.current && adRef.current.children.length === 0) {
// Create the global object directly on the window context safely
window.atOptions = {
'key' : '18c04c850a95bb40a9cd68d794020262',
'format' : 'iframe',
'height' : 50,
'width' : 320,
'params' : {}
};

const invokeScript = document.createElement('script');
invokeScript.type = 'text/javascript';
invokeScript.src = 'https://www.highperformanceformat.com/18c04c850a95bb40a9cd68d794020262/invoke.js';

adRef.current.appendChild(invokeScript);
}
}, []);

return (
<div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0', minHeight: '50px' }}>
<div ref={adRef}></div>
</div>
);
}
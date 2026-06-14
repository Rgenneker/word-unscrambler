import React, { useEffect, useRef } from 'react';

export default function AdUnit300x250() {
const adRef = useRef(null);

useEffect(() => {
if (adRef.current && adRef.current.children.length === 0) {
// Create the global object directly on the window context safely
window.atOptions = {
'key' : 'f0f1e89d0da29b92cdb449717029c6a1',
'format' : 'iframe',
'height' : 250,
'width' : 300,
'params' : {}
};

const invokeScript = document.createElement('script');
invokeScript.type = 'text/javascript';
invokeScript.src = 'https://www.highperformanceformat.com/f0f1e89d0da29b92cdb449717029c6a1/invoke.js';

adRef.current.appendChild(invokeScript);
}
}, []);

return (
<div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0', minHeight: '250px' }}>
<div ref={adRef}></div>
</div>
);
}
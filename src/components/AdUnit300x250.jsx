import React, { useEffect, useRef } from 'react';

export default function AdUnit300x250() {
const adRef = useRef(null);

useEffect(() => {
// Only run this code if the container exists and doesn't already have the ad injected
if (adRef.current && adRef.current.children.length === 0) {
// 1. Create the configuration script
const configScript = document.createElement('script');
configScript.type = 'text/javascript';
configScript.innerHTML = atOptions = { 'key' : 'f0f1e89d0da29b92cdb449717029c6a1', 'format' : 'iframe', 'height' : 250, 'width' : 300, 'params' : {} };;

// 2. Create the main invocation script
const invokeScript = document.createElement('script');
invokeScript.type = 'text/javascript';
invokeScript.src = 'https://www.highperformanceformat.com/f0f1e89d0da29b92cdb449717029c6a1/invoke.js';

// 3. Append them to our DOM element safely
adRef.current.appendChild(configScript);
adRef.current.appendChild(invokeScript);
}
}, []);

return (
<div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
<div ref={adRef}></div>
</div>
);
}
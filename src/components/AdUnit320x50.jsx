import React, { useEffect, useRef } from 'react';

export default function AdUnitBottom320x50() {
const adRef = useRef(null);

useEffect(() => {
// Ensure the container is ready and hasn't already injected the scripts
if (adRef.current && adRef.current.children.length === 0) {

// 1. Create the configuration script object
const configScript = document.createElement('script');
configScript.type = 'text/javascript';
configScript.innerHTML = atOptions = { 'key' : '18c04c850a95bb40a9cd68d794020262', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {} };;

// 2. Create the script element to invoke the ad delivery
const invokeScript = document.createElement('script');
invokeScript.type = 'text/javascript';
invokeScript.src = 'https://www.highperformanceformat.com/18c04c850a95bb40a9cd68d794020262/invoke.js';

// 3. Inject both scripts into the local ref container
adRef.current.appendChild(configScript);
adRef.current.appendChild(invokeScript);
}
}, []);

return (
<div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
{/* React points the target container here dynamically */}
<div ref={adRef}></div>
</div>
);
}
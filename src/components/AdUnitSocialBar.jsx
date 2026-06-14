import React, { useEffect, useRef } from 'react';

export default function AdUnit320x50() {
const adRef = useRef(null);

useEffect(() => {
if (adRef.current && adRef.current.children.length === 0) {
window.atOptions = {
'key' : 'a2a5dc34cfd4f242809fa40dba3f85c0',
'format' : 'iframe',
'height' : 50,
'width' : 320,
'params' : {}
};

const invokeScript = document.createElement('script');
invokeScript.type = 'text/javascript';
invokeScript.src = 'https://www.highperformanceformat.com/a2a5dc34cfd4f242809fa40dba3f85c0/invoke.js';

adRef.current.appendChild(invokeScript);
}
}, []);

return (
<div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0', minHeight: '50px' }}>
<div ref={adRef}></div>
</div>
);
}
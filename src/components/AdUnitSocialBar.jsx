import React, { useEffect } from 'react';

export default function AdUnitSocialBar() {
useEffect(() => {
// 1. Create the script element
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://pl29741880.effectivecpmnetwork.com/0f8e7be192fc2efa33c5da2e34e2f56a/invoke.js';
script.async = true;
script.setAttribute('data-cfasync', 'false');

// 2. Append the script to the body or document head so it runs
document.body.appendChild(script);

// Optional Clean-up: removes the script if the user leaves the page
return () => {
document.body.removeChild(script);
};
}, []);

return (
<div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
{/* React renders this empty div, and Adsterra's script hooks onto its ID to inject the ad */}
<div id="container-0f8e7be192fc2efa33c5da2e34e2f56a"></div>
</div>
);
}
function safeAppendScript({ id, src, attrs = {}, beforeElementId }) {
  try {
    if (document.getElementById(id)) return Promise.resolve('exists');

    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.id = id;
      s.async = true;
      if (src) s.src = src;
      Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
      s.onload = () => resolve('loaded');
      s.onerror = (err) => reject(err || new Error('failed'));

      if (beforeElementId) {
        const beforeEl = document.getElementById(beforeElementId);
        if (beforeEl && beforeEl.parentNode) {
          beforeEl.parentNode.insertBefore(s, beforeEl);
          return;
        }
      }

      document.head.appendChild(s);
    });
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function loadExternalAdScripts() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // 160x300 slot
  try {
    window.atOptions = {
      key: '99b99bd48ed0c826c383982244d7b748',
      format: 'iframe',
      height: 300,
      width: 160,
      params: {},
    };
    console.debug('entry-ad-loader: set atOptions for 160x300');
    await safeAppendScript({
      id: 'hp-160x300-entry-script',
      src: 'https://www.highperformanceformat.com/99b99bd48ed0c826c383982244d7b748/invoke.js',
    });
    console.debug('entry-ad-loader: 160x300 appended');
  } catch (e) {
    console.warn('entry-ad-loader: 160x300 failed', e);
  }

  // Native banner slot
  try {
    const nativeId = 'native-banner-entry-script';
    await safeAppendScript({
      id: nativeId,
      src: 'https://pl29741880.effectivecpmnetwork.com/0f8e7be192fc2efa33c5da2e34e2f56a/invoke.js',
      attrs: { async: 'async', 'data-cfasync': 'false' },
    });
    console.debug('entry-ad-loader: native banner appended');
  } catch (e) {
    console.warn('entry-ad-loader: native banner failed', e);
  }

  // 320x50 slot
  try {
    window.atOptions = {
      key: '18c04c850a95bb40a9cd68d794020262',
      format: 'iframe',
      height: 50,
      width: 320,
      params: {},
    };
    console.debug('entry-ad-loader: set atOptions for 320x50');
    await safeAppendScript({
      id: 'hp-320x50-entry-script',
      src: 'https://www.highperformanceformat.com/18c04c850a95bb40a9cd68d794020262/invoke.js',
    });
    console.debug('entry-ad-loader: 320x50 appended');
  } catch (e) {
    console.warn('entry-ad-loader: 320x50 failed', e);
  }
}

export default loadExternalAdScripts;

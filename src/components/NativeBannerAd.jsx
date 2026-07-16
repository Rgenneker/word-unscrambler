const AD_ID = "0f8e7be192fc2efa33c5da2e34e2f56a";

export default function NativeBannerAd() {
  return (
    <div className="w-full border-b border-white/10 bg-slate-950/90 px-4 py-3">
      <div className="mx-auto flex min-h-[90px] max-w-7xl items-center justify-center">
        <div id={`container-${AD_ID}`} className="w-full text-center" />
      </div>
    </div>
  );
}
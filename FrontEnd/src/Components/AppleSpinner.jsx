const AppleSpinner = () => (
  <div className="flex items-center justify-center">
    {/* Container: 128px (w-32) */}
    <div className="relative w-24 h-24 animate-spin">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          // Blade: 8px wide, 32px tall
          className="absolute w-[8px] h-[32px] bg-[#22c55e] rounded-full left-1/2 top-0"
          style={{
            // Origin is exactly half the container (64px)
            transformOrigin: '4px 64px',
            transform: `translateX(-50%) rotate(${i * 30}deg)`,
            // Creates the smooth tapering opacity trail
            opacity: 1 - (0.07 * i),
          }}
        />
      ))}
    </div>
  </div>
);

export default AppleSpinner;
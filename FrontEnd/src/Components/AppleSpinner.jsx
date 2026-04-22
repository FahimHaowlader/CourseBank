const AppleSpinner = () => (
  <div className="flex items-center justify-center">
    {/* Container: 96px (h-24) */}
    <div className="relative w-24 h-24 animate-spin">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          // Blade size
          className="absolute w-[10px] h-[28px] bg-[#22c55e] rounded-full left-1/2 top-0"
          style={{
            // Half of w-24 (96px) is 48px. 
            // This ensures perfect circular rotation.
            transformOrigin: '5px 48px', 
            transform: `translateX(-50%) rotate(${i * 30}deg)`,
            opacity: 1 - (0.08 * i),
          }}
        />
      ))}
    </div>
  </div>
);

export default AppleSpinner;
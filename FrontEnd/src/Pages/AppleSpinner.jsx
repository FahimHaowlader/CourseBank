const AppleSpinner = () => (
  <div className="relative w-5 h-5 animate-spin">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute w-[2px] h-[5px] bg-current rounded-full left-1/2 top-0 origin-[0_10px]"
        style={{
          transform: `rotate(${i * 30}deg)`,
          opacity: 1 - (i * 0.08),
        }}
      />
    ))}
  </div>
);

export default AppleSpinner;
export const ElevoneIcon = ({ className, size = 16 }: { className?: string, size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="4" 
    strokeLinecap="round" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    {/* Left Symbol (Traced from reference) */}
    <path d="M47 17L19 77" />
    <path d="M19 85L44 74" />
    <path d="M30 90L36 66" />

    {/* Right Symbol (Traced from reference) */}
    <path d="M72 5L45 64" />
    <path d="M49 71L76 60" />
    <path d="M55 77L68 14" />
  </svg>
);

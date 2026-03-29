interface LogoProps {
  size?: number;
}

export default function Logo({ size = 52 }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
    >
      <path d="M8,8 L8,68 L38,68 L50,85 L62,68 L92,68 L92,8 Z" fill="#00e5ff" />
      <path d="M14,14 L14,62 L38,62 L50,76 L62,62 L86,62 L86,14 Z" fill="#1a202c" />
      <path d="M50,25 C50,25 34,28 30,32 L30,58 C30,58 42,55 50,57 Z" fill="#00e5ff" />
      <path d="M50,25 C50,25 66,28 70,32 L70,58 C70,58 58,55 50,57 Z" fill="#00e5ff" />
      <line x1="50" y1="25" x2="50" y2="57" stroke="#1a202c" strokeWidth="1.5"/>
      <line x1="34" y1="37" x2="48" y2="35" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="33" y1="43" x2="48" y2="41" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="33" y1="49" x2="48" y2="47" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="52" y1="35" x2="66" y2="37" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="52" y1="41" x2="67" y2="43" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="52" y1="47" x2="67" y2="49" stroke="#1a202c" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

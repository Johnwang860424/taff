const DecorativeCircle = () => {
  return (
    <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-30 md:opacity-40 lg:opacity-60 mix-blend-overlay md:mix-blend-soft-light select-none">
      <svg className="w-full h-full text-white" fill="none" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
        {/* Circular path for text */}
        <path 
          d="M 250, 250 m -180, 0 a 180,180 0 1,1 360,0 a 180,180 0 1,1 -360,0" 
          fill="transparent" 
          id="circleTextPath"
        ></path>
        
        {/* Rotating Circular Text */}
        <text 
          fill="currentColor" 
          fontFamily="'Cormorant Garamond', serif" 
          fontSize="32" 
          fontWeight="400" 
          letterSpacing="14"
        >
          <textPath href="#circleTextPath" startOffset="50%" textAnchor="middle">
            TAFF DESSERT
          </textPath>
        </text>

        {/* Central Cloud - larger scale */}
        <path 
          className="cloud-path" 
          d="M150 280 Q140 280 135 270 Q120 250 130 230 Q140 210 160 210 Q165 180 190 170 Q220 160 240 180 Q250 170 270 175 Q290 180 295 200 Q315 205 325 220 Q335 240 325 260 Q315 280 290 275 L150 280 Z" 
          stroke="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="6" 
          transform="translate(10, 20)"
        ></path>
        
        {/* Static Circle Outline */}
        <circle 
          cx="250" 
          cy="250" 
          r="180" 
          stroke="currentColor" 
          strokeWidth="1.5"
          opacity="0.5"
        ></circle>
        
        {/* Established year */}
        <text 
          fill="currentColor" 
          fontFamily="'Cormorant Garamond', serif" 
          fontSize="18" 
          letterSpacing="6" 
          textAnchor="middle" 
          x="250" 
          y="360"
          className="opacity-70"
        >
          since 2022
        </text>
      </svg>
    </div>
  );
};

export default DecorativeCircle;

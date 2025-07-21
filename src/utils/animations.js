/**
 * Animation Utility Functions
 * Following clean architecture principles
 */

/**
 * Get staggered animation delay for list items
 * @param {number} index - Item index
 * @param {number} baseDelay - Base delay in seconds
 * @returns {object} Style object with animation delay
 */
export const getStaggeredDelay = (index, baseDelay = 0.1) => ({
  animationDelay: `${index * baseDelay}s`
});

/**
 * Get entrance animation class based on direction
 * @param {string} direction - 'up', 'down', 'left', 'right', 'scale'
 * @returns {string} Animation class name
 */
export const getEntranceAnimation = (direction = 'up') => {
  const animations = {
    up: 'animate-slide-in-up',
    down: 'animate-slide-down',
    left: 'animate-slide-in-left',
    right: 'animate-slide-in-right',
    scale: 'animate-scale-in',
    bounce: 'animate-bounce-in',
    fade: 'animate-fade-in'
  };
  
  return animations[direction] || animations.up;
};

/**
 * Get hover animation classes
 * @param {string} type - Type of hover effect
 * @returns {string} Hover classes
 */
export const getHoverAnimation = (type = 'lift') => {
  const effects = {
    lift: 'hover:scale-105 hover:-translate-y-1 hover:shadow-dopamine-hover',
    glow: 'hover:shadow-glow transition-all duration-300',
    bounce: 'hover:animate-bounce',
    pulse: 'hover:animate-pulse',
    rotate: 'hover:rotate-6',
    glass: 'hover:bg-glass-white hover:backdrop-blur-md'
  };
  
  return `transition-all duration-300 ease-elastic ${effects[type] || effects.lift}`;
};

/**
 * Get loading animation classes
 * @param {string} type - Type of loading animation
 * @returns {string} Loading classes
 */
export const getLoadingAnimation = (type = 'pulse') => {
  const loadings = {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
    shimmer: 'animate-shimmer',
    float: 'animate-float'
  };
  
  return loadings[type] || loadings.pulse;
};

/**
 * Get micro-interaction classes for buttons
 * @param {string} variant - Button variant
 * @returns {string} Micro-interaction classes
 */
export const getButtonMicroInteraction = (variant = 'primary') => {
  const base = 'transition-all duration-200 ease-out transform active:scale-95';
  
  const variants = {
    primary: `${base} hover:scale-105 hover:shadow-dopamine-hover focus:ring-2 focus:ring-primary-500/50`,
    secondary: `${base} hover:scale-105 hover:shadow-dopamine-secondary focus:ring-2 focus:ring-secondary-500/50`,
    success: `${base} hover:scale-105 hover:shadow-dopamine-success focus:ring-2 focus:ring-success-500/50`,
    glass: `${base} hover:bg-glass-white hover:backdrop-blur-md hover:border-glass-border`,
    neuro: `${base} hover:shadow-neuro-inset active:shadow-neuro-inset`
  };
  
  return variants[variant] || variants.primary;
};

/**
 * Get scroll-triggered animation classes
 * @param {number} delay - Delay in seconds
 * @returns {string} Scroll animation classes
 */
export const getScrollAnimation = (delay = 0) => {
  return `opacity-0 translate-y-8 transition-all duration-700 ease-out`;
};

/**
 * Get glass morphism effect classes
 * @param {string} intensity - 'light', 'medium', 'strong'
 * @returns {string} Glass effect classes
 */
export const getGlassMorphism = (intensity = 'medium') => {
  const effects = {
    light: 'bg-glass-light backdrop-blur-sm border border-glass-border',
    medium: 'bg-glass-white backdrop-blur-md border border-glass-border',
    strong: 'bg-frosted-white backdrop-blur-lg border border-glass-border'
  };
  
  return effects[intensity] || effects.medium;
};

/**
 * Get neuomorphism effect classes
 * @param {string} mode - 'raised', 'inset'
 * @param {boolean} isDark - Dark mode flag
 * @returns {string} Neuro effect classes
 */
export const getNeuomorphism = (mode = 'raised', isDark = false) => {
  if (mode === 'inset') {
    return isDark ? 'shadow-neuro-inset-dark' : 'shadow-neuro-inset';
  }
  return isDark ? 'shadow-neuro-dark' : 'shadow-neuro';
};

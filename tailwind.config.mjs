/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Farooj Almasi palette (derived from the logo) ──
        // Token KEYS are kept from the original app so components need no churn,
        // but ROLES are remapped to the new brand:
        //   brand.red  = PRIMARY brand accent → logo leaf-green (CTAs, highlights)
        //   brand.gold = gold accent → logo's gold rim (badges, shine)
        //   brand.green = SUCCESS/positive state (coupons, savings) — kept green,
        //                 a distinct teal so it reads apart from the primary.
        brand: {
          // primary accent (leaf green from the logo circle)
          red: '#2E7D32',
          redDeep: '#1B5E20',
          redSoft: '#43A047',
          // gold accent (logo rim / corn)
          gold: '#E0A526',
          goldDeep: '#B9831A',
          // success (distinct teal-green)
          green: '#0E8A5F',
          // light surfaces (warm off-white so food photos stay appetizing)
          cream: '#FAF6EC',
          cream2: '#F2E9D6',
          card: '#FFFFFF',
          // text (deep green-leaning ink)
          ink: '#152012',
          ink2: '#2C3A26',
          muted: '#6F7A64',
          line: 'rgba(21,32,18,0.10)',
        },
      },
      fontFamily: {
        display: ["'Anton'", 'system-ui', 'sans-serif'],
        sans: ["'Space Grotesk'", 'system-ui', 'sans-serif'],
        arabic: ["'Changa'", 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(27,94,32,0.08)',
        card: '0 10px 30px rgba(27,94,32,0.08), 0 1px 0 rgba(255,255,255,0.6) inset',
        cardHover: '0 20px 44px rgba(46,125,50,0.18)',
        red: '0 12px 30px rgba(46,125,50,0.32)',
        gold: '0 12px 30px rgba(224,165,38,0.35)',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%,-1.6%,0) scale(1.06)' },
          '100%': { transform: 'translate3d(-2%,1.6%,0) scale(1.03)' },
        },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-7px)' } },
        logoFloat: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-11px)' } },
        shine: { to: { backgroundPosition: '200% center' } },
        splashOrb: {
          '0%,100%': { opacity: '.5', transform: 'translateX(-50%) scale(1)' },
          '50%': { opacity: '.85', transform: 'translateX(-50%) scale(1.16)' },
        },
        bounceDot: { '0%,80%,100%': { transform: 'scale(.3)', opacity: '.5' }, '40%': { transform: 'scale(1)', opacity: '1' } },
      },
      animation: {
        drift: 'drift 20s ease-in-out infinite alternate',
        floaty: 'floaty 4s ease-in-out infinite',
        logoFloat: 'logoFloat 4s ease-in-out 1s infinite',
        shine: 'shine 3s linear infinite',
        splashOrb: 'splashOrb 6s ease-in-out infinite',
        bounceDot: 'bounceDot 1.2s infinite',
      },
    },
  },
  plugins: [],
};

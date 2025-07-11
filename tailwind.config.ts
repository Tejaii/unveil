import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Custom color palette
				'deep-blue-violet': '#3D52A0',
				'bright-periwinkle': '#7091E6',
				'dusty-blue-grey': '#8697C4',
				'light-slate': '#ADBBD4',
				'lilac-mist': '#EDE8F5',
				'active-pill': '#D4DCF0',
				
				// Dark mode specific colors
				'dark-bg': '#343541',
				'dark-sidebar': '#202123',
				'dark-card': '#3A3B47',
				'dark-input': '#40414F',
				'dark-text': '#ECECF1',
				'dark-muted': '#A6A6B0',
				'dark-accent-bg': '#1E4036',
				
				border: 'transparent',
				input: '#ADBBD4',
				ring: '#7091E6',
				background: '#EDE8F5',
				foreground: '#3D52A0',
				primary: {
					DEFAULT: '#7091E6',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#8697C4',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#ef4444',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#8697C4',
					foreground: '#8697C4'
				},
				accent: {
					DEFAULT: '#D4DCF0',
					foreground: '#3D52A0'
				},
				popover: {
					DEFAULT: '#ADBBD4',
					foreground: '#3D52A0'
				},
				card: {
					DEFAULT: '#ADBBD4',
					foreground: '#3D52A0'
				},
			},
			borderRadius: {
				lg: '1rem',
				md: 'calc(1rem - 2px)',
				sm: 'calc(1rem - 4px)'
			},
			boxShadow: {
				'floating': '0px 4px 12px rgba(61, 82, 160, 0.15)',
				'floating-lg': '0px 8px 24px rgba(61, 82, 160, 0.2)',
				'floating-hover': '0px 12px 32px rgba(61, 82, 160, 0.25)',
			},
			backdropBlur: {
				'xs': '2px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
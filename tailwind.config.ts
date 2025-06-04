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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: '#0d0d0d',
				foreground: '#e0e0e0',
				primary: {
					DEFAULT: '#2e2e2e',
					foreground: '#e0e0e0'
				},
				secondary: {
					DEFAULT: '#1e1e1e',
					foreground: '#e0e0e0'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#1a1a1a',
					foreground: '#a0a0a0'
				},
				accent: {
					DEFAULT: '#2e2e2e',
					foreground: '#e0e0e0'
				},
				popover: {
					DEFAULT: '#1e1e1e',
					foreground: '#e0e0e0'
				},
				card: {
					DEFAULT: '#1e1e1e',
					foreground: '#e0e0e0'
				},
				sidebar: {
					DEFAULT: '#1e1e1e',
					foreground: '#e0e0e0',
					primary: '#2e2e2e',
					'primary-foreground': '#e0e0e0',
					accent: '#2e2e2e',
					'accent-foreground': '#e0e0e0',
					border: '#2e2e2e',
					ring: '#3e3e3e'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
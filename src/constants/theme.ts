export const theme = {
    colors: {
        primary: '#B90C0C',     // red buttons, links, active step
        black: '#000000',       // big titles
        text: '#111827',        // labels, body text
        textMuted: '#6B7280',   // descriptions, input text
        textSubtle: '#9CA3AF',  // placeholders, inactive step numbers
        border: '#E5E7EB',      // input and card borders
        surface: '#F3F4F6',     // inactive step circle
        placeholder: '#D9D9D9', // empty photo boxes, logo box
        secondary: '#8C8C8C',   
        white: '#FFFFFF',
    },
    fonts: {
        regular: 'Inter_400Regular',
        bold: 'Inter_700Bold',
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 20,
        xl: 24,
        xxl: 32,
    },
    radius: {
        sm: 8,
        md: 12,
        lg: 16,
        full: 999,
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 18,
        xl: 24,
    },
} as const; //for autocomplete

export type Theme = typeof theme;
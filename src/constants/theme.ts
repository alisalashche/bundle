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


        surfaceAlt: '#F5F5F5',  // "See yarn archive" row
        photoBg: '#F9FAFB',     // empty photo preview
        tint: '#FFF5F5',        // light red circle behind + icons
        dark: '#454545',        // small Cancel button, archive link text
    },
    fonts: {
        regular: 'Inter_400Regular',
        semiBold: 'Inter_600SemiBold',
        bold: 'Inter_700Bold',
        extraBold: 'Inter_800ExtraBold',
    },
    fontSizes: {
        caption: 12,
        xs: 13,
        sm: 14,
        button: 15,
        md: 16,
        lg: 20,
        xl: 24,
        xxl: 32,
    },
    radius: {
        xs: 3,   
        sm: 8,
        md: 12, 
        lg: 16,  
        xl: 18,  
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
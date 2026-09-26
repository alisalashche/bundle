export const theme = {
    colors: {
        primary: '#B90C0C',   // buttons, breadcrumbs, links, active chip/step, required *, errors, FAB
        lightRed: '#FFF1F2',  // circle behind + in "Add new …" cards, empty-state icon circle
        black: '#000000',     // H1/H2 titles, labels, card names, body text
        white: '#FFFFFF',     // screen & card backgrounds, text on red
        grey: '#6F6F6F',      // photo placeholders, input placeholders, inactive chip/step text, link rows
        darkGrey: '#454545',  // page descriptions, card subtitles, corner badges, photo-option icons
        lightGray: '#F5F5F5', // inactive chips & steps, target badges, link rows, icon buttons
        border: '#D9D9D9',    // card & input borders, logo placeholder, breadcrumb arrows
    },
    fonts: {
        regular: 'Inter_400Regular',     // body text, inputs, descriptions
        semiBold: 'Inter_600SemiBold',   // link rows, photo options, small card subtitles
        bold: 'Inter_700Bold',           // titles, labels, buttons, card names
        extraBold: 'Inter_800ExtraBold', // tab labels
        black: 'Inter_900Black',         // breadcrumbs, Back / Cancel
    },
    fontSizes: {
        xs: 13,      // input text, small card names, step descriptions
        sm: 14,      // labels, page descriptions, logo, info rows, step titles
        md: 16,      // breadcrumbs, big card names, bundle-row subtitles
        lg: 20,      // buttons, "Add new …" cards, month labels, FAB menu, "See more"
        xl: 24,      // section headings, bundle-row titles, empty-state heading
        xxl: 32,     // page and wizard titles
    },
    spacing: {
        none: 0,
        xs: 4,     // label - *, title - subtitle inside cards, month label - divider
        sm: 8,     // label - input, chips, breadcrumbs, step dots, card grids, hero blocks
        md: 12,    // padding & gaps inside cards, section heading - content, FAB menu
        lg: 16,    // screen side padding, header - content, input padding, link rows
        xl: 20,    // screen top/bottom padding, gap between blocks on a screen
        jumbo: 80, // empty state vertical padding
    },
    radius: {
        sm: 4,     // collage tiles in "My bundle" rows
        md: 12,    // cards, inputs, buttons, chips, badges, link rows, logo
        full: 999, // step dots, icon circles, FAB
    },
    shadows: {
        card: { offsetY: 6, radius: 9, opacity: 0.06 },   // add-cards, bundle rows, step cards
        raised: { offsetY: 0, radius: 5, opacity: 0.25 }, // buttons, FAB, FAB menu
    },
} as const;

export type Theme = typeof theme;
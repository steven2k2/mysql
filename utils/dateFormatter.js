// utils/dateFormatter.js
const formatDate = (date, format = 'short') => {
    const options = {};

    switch (format) {
        case 'short':
            // AU/NZ short format: 01/02/2024 (DD/MM/YYYY)
            options.day = '2-digit';
            options.month = '2-digit';
            options.year = 'numeric';
            break;

        case 'medium':
            // Medium format: 01 Feb 2024
            options.day = '2-digit';
            options.month = 'short';
            options.year = 'numeric';
            break;

        case 'long':
            // Long format: 1 February 2024
            options.day = 'numeric';
            options.month = 'long';
            options.year = 'numeric';
            break;

        case 'full':
            // Full format with weekday: Thursday, 1 February 2024
            options.weekday = 'long';
            options.day = 'numeric';
            options.month = 'long';
            options.year = 'numeric';
            break;

        default:
            throw new Error(`Unsupported format: ${format}`);
    }

    return new Date(date).toLocaleDateString('en-AU', options);
};

module.exports = { formatDate };
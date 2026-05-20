export const imageMap: Record<string, () => Promise<string>> = import.meta.glob('/src/assets/images/*', { import: 'default' });

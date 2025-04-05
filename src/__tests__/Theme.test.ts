import theme from '../theme';

describe('Theme Configuration', () => {
  test('has correct primary colors', () => {
    expect(theme.palette.primary.main).toBe('#0d6efd');
    expect(theme.palette.primary.light).toBe('#3a8ffe');
    expect(theme.palette.primary.dark).toBe('#0052cc');
  });

  test('has proper typography settings', () => {
    expect(theme.typography.fontFamily).toContain('Segoe UI');
    expect(theme.typography.fontSize).toBe(16);
  });

  test('has proper component styling', () => {
    expect(theme.components?.MuiCard?.styleOverrides?.root).toBeDefined();
    expect(theme.components?.MuiAppBar?.styleOverrides?.root).toBeDefined();
  });
});
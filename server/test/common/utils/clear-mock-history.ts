export function clearMockHistory(mockObject): void {
  Object.values(mockObject).forEach((item: jest.Mock) => {
    if (item.mockClear) {
      item.mockClear();
    } else {
      clearMockHistory(item);
    }
  });
}

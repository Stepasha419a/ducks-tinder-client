export const FilesServiceMock = jest.fn().mockReturnValue({
  savePicture: jest.fn().mockResolvedValue('picture-name'),
  deletePicture: jest.fn(),
});

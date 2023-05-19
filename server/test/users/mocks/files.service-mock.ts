export const FilesServiceMock = {
  savePicture: jest.fn().mockResolvedValue('picture-name'),
  deletePicture: jest.fn(),
};

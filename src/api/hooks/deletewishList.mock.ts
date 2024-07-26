import { rest } from 'msw';
import { BASE_URL } from '../instance';
import { getMockData, updateMockData } from './mockData'; // Adjust the path if necessary

export const DeleteWishListMockHandler = [
  rest.delete(`${BASE_URL}/api/wishes/:wishId`, (req, res, ctx) => {
    const { wishId } = req.params;
    const wishIdNumber = typeof wishId === 'string' ? parseInt(wishId, 10) : undefined;

    if (wishIdNumber === undefined || isNaN(wishIdNumber)) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid wishId' }));
    }

    // Get current mock data and remove the item with the specified ID
    const mockData = getMockData();
    const updatedContent = mockData.content.filter((item) => item.id !== wishIdNumber);

    // Update mock data
    updateMockData({
      ...mockData,
      content: updatedContent,
    });

    return res(ctx.status(200), ctx.json({ message: 'Item successfully deleted' }));
  }),
];

import { render } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

export function renderWithRouter(children: React.ReactElement, routes = []) {
  const options = { element: children, path: '/' };

  const router = createMemoryRouter([{ ...options }, ...routes], {
    initialEntries: [options?.path],
    initialIndex: 1,
  });

  return render(<RouterProvider router={router} />);
}

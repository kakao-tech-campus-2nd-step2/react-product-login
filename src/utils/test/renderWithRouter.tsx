import { render } from '@testing-library/react';
import React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

interface RouterChildren {
  element: React.ReactElement;
  path: string;
}

export function renderWithRouter(children: React.ReactElement, routes: RouterChildren[] = []) {
  const options = { element: children, path: '/' };

  const router = createMemoryRouter([{ ...options }, ...routes], {
    initialEntries: [options?.path],
    initialIndex: 1,
  });

  return render(<RouterProvider router={router} />);
}

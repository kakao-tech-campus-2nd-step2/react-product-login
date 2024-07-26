import { render, screen } from '@testing-library/react';

import { CategoryItem } from './CategoryItem';

describe('CategoryItem', () => {
  const img = 'img.jpg';
  const label = 'label';

  test('사진이 잘 렌더링 되는지 확인', () => {
    render(<CategoryItem image={img} label={label} />);
    const image = screen.getByAltText(label);
    expect(image).toHaveAttribute('src', img);
    expect(image).toBeInTheDocument();
  });

  test('라벨이 잘 렌더링 되는지 확인', () => {
    render(<CategoryItem image={img} label={label} />);
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });
});

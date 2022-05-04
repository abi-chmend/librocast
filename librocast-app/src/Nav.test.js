import { render, screen } from '@testing-library/react';
import Nav from './components/Nav';

describe('Nav', () => {
  test('renders Nav component', () => {
    render(<Nav />);
  });
});
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the <NotFound.js /> component', () => {
  test('Test if contains an h2 heading with the text Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/trybeCSS');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundText).toBeInTheDocument();
  });
  test('Test if the page shows the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/trybeCSS');
    const notFoundImage = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

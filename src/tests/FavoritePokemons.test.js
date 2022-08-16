import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the <FavoritePokemons.js /> component', () => {
  test('Test if the message "No favorite pokemon found" appears on the screen', () => {
    renderWithRouter(<App />);
    const favPokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favPokemonsLink);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
  test('Test if all favorite pokemon cards are displayed', () => {

  });
});

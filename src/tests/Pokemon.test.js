import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the <Pokemon.js /> component', () => {
  test('Test if a card with the information of a given pokémon is rendered', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('Test if the card contains a nav link to view details for this pokemon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
  });
  test('Test if clicking on the nav link, redirects to the pokémon details page', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Test if there is a star icon in favorite pokemons', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const favPokemon = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    expect(favPokemon).toBeInTheDocument();
    userEvent.click(favPokemon);
    expect(favPokemon.value).toBeTruthy();
    const starFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFavorite).toBeInTheDocument();
    expect(starFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(starFavorite).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

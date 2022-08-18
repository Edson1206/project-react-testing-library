import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the <PokemonDetails.js /> component', () => {
  test('test if the detailed information of the selected pokemon is shown', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const detailsText = screen.getByText('Pikachu Details');
    expect(detailsText).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
    const description = screen.getByText(/roasts/i);
    expect(description).toBeInTheDocument();
  });
  test(
    'Test if there is a section on the page with maps with the pokémons locations',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetails);
      const locationDescription = screen.getByRole(
        'heading', { level: 2, name: /game locations of pikachu/i },
      );
      expect(locationDescription).toBeInTheDocument();
    },
  );
  test('Test if all pokemon locations should be shown in the details section', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const pokemonLocation = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(pokemonLocation).toHaveLength(2);
  });
  test('test if the location name and a map image are displayed at each location', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const pokemonLocation = screen.getAllByRole('img', { name: /pikachu location/i });
    const srcImages = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];
    pokemonLocation.forEach((location, index) => {
      expect(location).toHaveAttribute('src', srcImages[index]);
      expect(location).toHaveAttribute('alt', 'Pikachu location');
    });
  });
  test('Test if the user can favorite a pokemon through the details page', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const favPokemon = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });
    expect(favPokemon).toBeInTheDocument();
    userEvent.click(favPokemon);
    expect(favPokemon).toBeChecked();
    userEvent.click(favPokemon);
    expect(favPokemon).not.toBeChecked();
  });
});

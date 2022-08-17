import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the <Pokedex.js /> component', () => {
  test(
    'Test if the page contains an h2 heading with the text Encountered pokémons',
    () => {
      renderWithRouter(<App />);
      const encounteredPokemons = screen.getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      });
      expect(encounteredPokemons).toBeInTheDocument();
    },
  );
  test('Test if pokémon is displayed when the Next pokémon button is clicked:', () => {
    // const { pokemons } = this.props;
    renderWithRouter(<App />);
    const nextPokemon = screen.getByTestId('next-pokemon');
    userEvent.click(nextPokemon);
    const charmander = screen.getByTestId('pokemon-type', { name: 'Fire' });
    expect(charmander).toBeInTheDocument();
  });
  test('Test if only one pokemon is shown at a time', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons[0]).toBeInTheDocument();
    expect(pokemons.length).toBe(1);
  });
  test('Test if the Pokédex has the filter buttons:', () => {
    renderWithRouter(<App />);
    const pokemonsbuttons = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    pokemonsbuttons.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
    });
  });
  test('Test if the Pokédex contains a button to reset the filter', () => {
    renderWithRouter(<App />);
    const buttonTypes = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttonTypes[0]);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttonAll);
    const pokemonType = screen.getByTestId('pokemon-name');
    expect(pokemonType).toHaveTextContent(/pikachu/i);
    const buttonNext = screen.getByTestId(/next-pokemon/);
    userEvent.click(buttonNext);
    expect(pokemonType).toHaveTextContent(/charmander/i);
  });
});

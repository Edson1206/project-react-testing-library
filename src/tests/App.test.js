import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the Home component', () => {
  test('Test if the top of the application contains the Home link', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
  });
  test('Test if the application is redirected to the Home page', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});

describe('Test the About component', () => {
  test('Test if the top of the application contains the About link', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
  });
  test('Test if the application is redirected to the About page', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
});

describe('Test the Favorite Pokemons component', () => {
  test('Test if the top of the application contains the Favorite Pokémons link', () => {
    renderWithRouter(<App />);
    const favPokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favPokemonsLink).toBeInTheDocument();
  });
  test('Test if the application is redirected to the Favorite Pokemons page', () => {
    const { history } = renderWithRouter(<App />);
    const favPokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favPokemonsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});

describe('Test the Not Found component', () => {
  test('Test if the application is redirected to the Not Found page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/trybeCSS');
    const noFoundTitle = screen.getByRole('heading', { level: 2, name: /not found/i });
    expect(noFoundTitle).toBeInTheDocument();
  });
});

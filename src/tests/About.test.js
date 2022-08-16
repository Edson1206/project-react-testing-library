import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test the <About.js /> component.', () => {
  test('Test if the page contains an h2 heading with the text About Pokédex', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const aboutText = screen.getByRole('heading', { level: 2, name: /about/i });
    expect(aboutText).toBeInTheDocument();
  });
  test('Test if the page contains two paragraphs of text about the Pokédex', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const p1 = screen.getByText(/encyclopedia/i);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(/filter/i);
    expect(p2).toBeInTheDocument();
  });
  test('Test if the page contains an image of a Pokédex:', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);
    const aboutImage = screen.getByAltText('Pokédex');
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

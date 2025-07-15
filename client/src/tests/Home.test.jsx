import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Acceuil from '../pages/acceuil'; // Import the actual component
import { test, expect, jest } from '@jest/globals';

// Mock the child components to avoid complex rendering issues
jest.mock('../components/CarouselSection', () => {
  return function CarouselSection() {
    return <div data-testid="carousel-section">Carousel Section</div>;
  };
});

jest.mock('../components/InfoSection', () => {
  return function InfoSection() {
    return <div data-testid="info-section">Info Section</div>;
  };
});

jest.mock('../components/CoworkingPreview', () => {
  return function CoworkingPreview() {
    return <div data-testid="coworking-preview">Coworking Preview</div>;
  };
});

jest.mock('../components/ServicesSection', () => {
  return function ServicesSection() {
    return <div data-testid="services-section">Services Section</div>;
  };
});

test('renders home page components', () => {
  render(
    <BrowserRouter>
      <Acceuil />
    </BrowserRouter>
  );
  
  // Check if main components are rendered
  expect(screen.getByTestId('carousel-section')).toBeInTheDocument();
  expect(screen.getByTestId('info-section')).toBeInTheDocument();
  expect(screen.getByTestId('coworking-preview')).toBeInTheDocument();
  expect(screen.getByTestId('services-section')).toBeInTheDocument();
});
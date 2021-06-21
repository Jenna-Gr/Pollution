import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';

import App from './App';
import communities from './mockData.js';


test('renders loading', () => {
  render(<App />);
  const textElement = screen.getByText(/Loading/i);
  expect(textElement).toBeInTheDocument();
});

jest.mock('axios');

describe('Pollution App Main', () => {
  beforeAll(async () => {
    axios.get.mockResolvedValueOnce({ data: communities });
    await render(<App />);
  });
  afterAll(() => {
    cleanup();
  });

  test('Should have a title bar', () => {
    expect(screen.getByTestId('title-bar')).toBeInTheDocument();
  });

  test('Should have a pie chart', () => {
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
  });

  test('Should have a Low Pollution Heading', () => {
    expect(screen.getByTestId('low-heading')).toBeInTheDocument();
  });

  test('Should have a High Pollution Heading', () => {
    expect(screen.getByTestId('high-heading')).toBeInTheDocument();
  });

  test('Should have a Show More Communities button', () => {
    expect(screen.getByTestId('more-communities')).toBeInTheDocument();
  });

  test('Should have a Show All Communities button', () => {
    expect(screen.getByTestId('all-communities')).toBeInTheDocument();
  });

  test('Should have a Low Community component', () => {
    expect(screen.queryAllByTestId("low-community")).toHaveLength(4);
  });

  test('Should have a High Community component', () => {
    expect(screen.queryAllByTestId("high-community")).toHaveLength(4);
  });

  test('Four more communities should be diplayed after clicking Show More Communities button', () => {
    userEvent.click(screen.getByTestId('more-communities'));
    expect(screen.queryAllByTestId('high-community')).toHaveLength(8);
  });
});

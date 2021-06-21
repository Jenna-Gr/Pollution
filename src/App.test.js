import React from "react";
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import "@testing-library/react/dont-cleanup-after-each";
import '@testing-library/jest-dom';

import App from './App';
import communities from './mockData.js';

jest.mock('axios');

describe('Pollution App Main', () => {
  afterEach(() => {
    cleanup();
  });

  test('Should have a title bar', async () => {
    axios.get.mockResolvedValueOnce({ data: communities });
    const { findByText } = render(<App />);
    expect(await findByText('POLLUTION')).toBeInTheDocument();
  });

  test('Should have a pie chart', async () => {
    axios.get.mockResolvedValueOnce({ data: communities });
    const { findByTestId } = render(<App />);
    expect(await findByTestId('pie-chart')).toBeInTheDocument();
  });

  test('Should have a Low Pollution Heading', async () => {
    axios.get.mockResolvedValueOnce({ data: communities });
    const { findByTestId } = render(<App />);
    expect(await findByTestId('low-heading')).toBeInTheDocument();
  });

  test('Should have a High Pollution Heading', async () => {
    axios.get.mockResolvedValueOnce({ data: communities });
    const { findByTestId } = render(<App />);
    expect(await findByTestId('high-heading')).toBeInTheDocument();
  });

  test('Should have a Show More Communities button', async () => {
    axios.get.mockResolvedValueOnce({ data: communities });
    const { findByTestId } = render(<App />);
    expect(await findByTestId('more-communities')).toBeInTheDocument();
  });

  test('Should have a Show All Communities button', async () => {
    axios.get.mockResolvedValueOnce({ data: communities });
    const { findByTestId } = render(<App />);
    expect(await findByTestId('all-communities')).toBeInTheDocument();
  });

  test('Should have a Low Community component', async () => {
    axios.get.mockResolvedValueOnce({ data: communities });
    const { findAllByTestId } = render(<App />);
    expect(await findAllByTestId("low-community")).toHaveLength(4);
  });

  test('Should have a High Community component', async () => {
    axios.get.mockResolvedValueOnce({ data: communities });
    const { findAllByTestId } = render(<App />);
    expect(await findAllByTestId("high-community")).toHaveLength(4);
  });
});

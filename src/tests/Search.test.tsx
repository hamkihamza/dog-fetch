import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { searchDogs as mockSearchDogs } from '../api/auth';
import Search from '../components/Search';

jest.mock('../api/auth', () => ({
  searchDogs: jest.fn(),
}));

describe('Search Component', () => {
  it('renders correctly', () => {
    render(<Search />);
  
    expect(screen.getByLabelText(/breeds/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/zip codes/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('allows the user to fill out the form', () => {
    render(<Search />);
  
    userEvent.type(screen.getByLabelText(/breeds/i), 'Bulldog,Poodle');
    userEvent.type(screen.getByLabelText(/zip codes/i), '90210,90211');
    
    expect(screen.getByLabelText(/breeds/i)).toHaveValue('Bulldog,Poodle');
    expect(screen.getByLabelText(/zip codes/i)).toHaveValue('90210,90211');
  });

  it('submits the form', async () => {
    const mockDogData = [
      { id: '1', name: 'Hunter', breed: 'Bulldog' },
      { id: '2', name: 'Pooch', breed: 'Poodle' },
    ];
    (mockSearchDogs as jest.Mock).mockResolvedValue({ ok: true, data: mockDogData });
  
    render(<Search />);
  
    userEvent.type(screen.getByLabelText(/breeds/i), 'Bulldog,Poodle');
    userEvent.type(screen.getByLabelText(/zip codes/i), '90210,90211');
    fireEvent.click(screen.getByText(/search/i));
  
    await waitFor(() => {
      expect(mockSearchDogs).toHaveBeenCalled();
      mockDogData.forEach((dog) => {
        expect(screen.getByRole('heading', { name: dog.name })).toBeInTheDocument();
        expect(screen.getByText(dog.breed)).toBeInTheDocument();
      });
    });
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import SignUpFormCustomer from '../pages/SignUpForm';

jest.mock('../../config', () => ({
  BACKEND_URL: 'http://localhost:5000',
}));

describe('SignUpFormCustomer Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <BrowserRouter>
        <ToastContainer />
        <SignUpFormCustomer />
      </BrowserRouter>
    );
  };

  test('renders the signup form', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('SIGN UP')).toBeInTheDocument();
  });

  test('displays validation errors for empty fields', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('SIGN UP'));

    await waitFor(() => {
      expect(screen.getByText('Name can not be empty')).toBeInTheDocument();
      expect(screen.getByText('Email can not be empty')).toBeInTheDocument();
      expect(screen.getByText('Phone number can not be empty')).toBeInTheDocument();
      expect(screen.getByText('Password can not be empty')).toBeInTheDocument();
    });
  });

  test('validates email format', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'invalidemail' },
    });
    fireEvent.click(screen.getByText('SIGN UP'));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  test('validates phone number format', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByText('SIGN UP'));

    await waitFor(() => {
      expect(screen.getByText('Phone number must be exactly 10 digits')).toBeInTheDocument();
    });
  });

  test('validates password requirements', async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'short' },
    });
    fireEvent.click(screen.getByText('SIGN UP'));

    await waitFor(() => {
      expect(
        screen.getByText('Password must be at least 8 characters long.')
      ).toBeInTheDocument();
    });
  });

  test('submits form successfully', async () => {
    renderComponent();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'StrongPassword1!' },
    });

    fireEvent.click(screen.getByText('SIGN UP'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5000/customer/register',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com',
            phoneNo: '1234567890',
            password: 'StrongPassword1!',
            status: 'PENDING',
            role: 'CUSTOMER',
          }),
        })
      );
      expect(screen.getByText('Registration successful!')).toBeInTheDocument();
    });
  });

  test('handles server errors', async () => {
    renderComponent();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 409,
    });

    fireEvent.change(screen.getByPlaceholderText('Full Name'), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone Number'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'StrongPassword1!' },
    });

    fireEvent.click(screen.getByText('SIGN UP'));

    await waitFor(() => {
      expect(screen.getByText('A user with the same email already exists!')).toBeInTheDocument();
    });
  });
});

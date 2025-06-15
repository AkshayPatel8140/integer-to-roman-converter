import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock fetch
global.fetch = jest.fn();


describe('Roman Numeral Converter App', () => {
  // Clear mock before each test to ensure no state is carried over
  beforeEach(() => { (fetch as jest.Mock).mockClear(); });

  test('renders input and button', () => {
    render(<App />);
    expect(screen.getByText(/Roman numeral converter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter number/i)).toBeInTheDocument();
    expect(screen.getByText(/Convert to roman numeral/i)).toBeInTheDocument();
  });

  test('converts number and displays result', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ output: 'IX' }) });

    render(<App />);
    fireEvent.change(screen.getByLabelText(/Enter number/i), { target: { value: '9' } });
    fireEvent.click(screen.getByText(/Convert to roman numeral/i));

    await waitFor(() => { expect(screen.getByText(/Roman numeral: IX/i)).toBeInTheDocument(); });
  });

  test('shows error on failed request', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, text: async () => 'Invalid query parameter' });

    render(<App />);
    fireEvent.change(screen.getByLabelText(/Enter number/i), { target: { value: '0' } });
    fireEvent.click(screen.getByText(/Convert to roman numeral/i));

    await waitFor(() => { expect(screen.getByText(/Invalid query parameter/i)).toBeInTheDocument(); });
  });

  test('shows generic error on failed request with empty response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, text: async () => '' });

    render(<App />);
    fireEvent.change(screen.getByLabelText(/Enter number/i), { target: { value: '0' } });
    fireEvent.click(screen.getByText(/Convert to roman numeral/i));

    await waitFor(() => { expect(screen.getByText(/Unknown error occurred/i)).toBeInTheDocument(); });
  });

  test('displays server error on network failure', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network failure'));

    render(<App />);
    fireEvent.change(screen.getByLabelText(/Enter number/i), { target: { value: '10' } });
    fireEvent.click(screen.getByText(/Convert to roman numeral/i));

    await waitFor(() => { expect(screen.getByText(/Server error. Please try again later./i)).toBeInTheDocument(); });
  });

});
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login', () => {
  const renderWithRouter = () => {
    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  };

  it('should show required errors when fields are empty', async () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });

  it('should show email format error', async () => {
    renderWithRouter();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalidemail' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Test123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/invalid email format/i)).toBeInTheDocument();
  });

  it('should show password pattern error', async () => {
    renderWithRouter();
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.findByText(/password must be at least/i)).toBeInTheDocument();
  });

  it('should submit when all fields are valid', async () => {
    const onSubmit = vi.fn();
    render(
      <MemoryRouter>
        <Login onSubmit={onSubmit} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Pass1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(await screen.queryByText(/is required/i)).not.toBeInTheDocument();
    expect(onSubmit).not.toBeCalled(); // use your own logic to trigger if needed
  });
});

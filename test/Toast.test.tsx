import { act } from 'react';
import { Id, toast } from 'react-toastify';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Toast } from '../src/toast/Toast.js';

describe('Toast', () => {
  test('renders the ToastContainer without crashing', () => {
    const { container } = render(<Toast />);
    expect(container).toBeInTheDocument();
  });

  test('displays a success toast message', async () => {
    render(<Toast />);
    act(() => {
      toast.success('Success message');
    });
    const message = await screen.findByText('Success message');
    expect(message).toBeInTheDocument();
  });

  test('displays an error toast message', async () => {
    render(<Toast />);
    act(() => {
      toast.error('Error occurred');
    });
    const message = await screen.findByText('Error occurred');
    expect(message).toBeInTheDocument();
  });

  test('displays an info toast message', async () => {
    render(<Toast />);
    act(() => {
      toast.info('Info message');
    });
    const message = await screen.findByText('Info message');
    expect(message).toBeInTheDocument();
  });

  test('handles loading toast state transitions', async () => {
    render(<Toast />);
    let toastId: Id;
    act(() => {
      toastId = toast.loading('Loading...');
    });
    const loadingMessage = await screen.findByText('Loading...');
    expect(loadingMessage).toBeInTheDocument();
    act(() => {
      toast.update(toastId, { isLoading: false, render: 'Done!', type: 'success' });
    });
    const doneMessage = await screen.findByText('Done!');
    expect(doneMessage).toBeInTheDocument();
  });
});

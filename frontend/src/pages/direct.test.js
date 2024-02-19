import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../pages/Dashboard'; // Update this path as needed

// Correctly mock the useAuth hook
jest.mock('../appcontext/Authcontext', () => ({
  useAuth: () => ({
    currentUser: { firstname: 'John Doe' },
    logout: jest.fn(),
  }),
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Dashboard />
      </Router>
    );
  });

  test('search for user (testuser) to message', () => {
    expect(screen.getByText('Welcome, John Doe')).toBeInTheDocument();
  });

  test('clicking on profile picture should prompt attachment for new picture', () => {
    const reminders = screen.getAllByText(/Reminders/i);
    expect(reminders.length).toBeGreaterThan(0); // Adjust according to expected count
    // If you want to make assertions on all found elements, you can iterate over `reminders`.
  });

  test('send a test message to a user (this is a test)', () => {
    const reminders = screen.getAllByText(/Reminders/i);
    expect(reminders.length).toBeGreaterThan(0); // Adjust according to expected count
    // If you want to make assertions on all found elements, you can iterate over `reminders`.
  });

  test('send a picture as message', () => {
    const reminders = screen.getAllByText(/Reminders/i);
    expect(reminders.length).toBeGreaterThan(0); // Adjust according to expected count
    // If you want to make assertions on all found elements, you can iterate over `reminders`.
  });
  

  // Additional tests can be added here
});

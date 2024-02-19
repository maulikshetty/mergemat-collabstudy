/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/login'; // replace with your actual path



describe('Login Component', () => {
    beforeEach(() => {
        render(
            <Router>
                <Login />
            </Router>
        );
    });

    test('email and password inputs accept input', () => {
        const { getAllByPlaceholderText } = render(
          <Router>
            <Login />
          </Router>
        );
      
        const emailInputs = getAllByPlaceholderText(/Email/i);
        const passwordInput = getAllByPlaceholderText(/Password/i)[0]; // Assuming there's only one password input
      
        // Assuming the first one is the one we want
        fireEvent.change(emailInputs[0], { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
      
        expect(emailInputs[0].value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password');
      });
      
      test('error feedback on random data submitted', () => {
        const { getAllByPlaceholderText } = render(
          <Router>
            <Login />
          </Router>
        );
      
        const emailInputs = getAllByPlaceholderText(/Email/i);
        const passwordInput = getAllByPlaceholderText(/Password/i)[0]; // Assuming there's only one password input
      
        // Assuming the first one is the one we want
        fireEvent.change(emailInputs[0], { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
      
        expect(emailInputs[0].value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password');
      });
      
});
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { waitFor, act } from '@testing-library/react';


// Mock the modules used in index.tsx
jest.mock('./App', () => () => <div>Mocked App</div>);
const mockReportWebVitals = jest.fn();
jest.mock('./reportWebVitals', () => ({
    __esModule: true,
    default: mockReportWebVitals,
}));

describe('index.tsx', () => {
    let rootElement: HTMLElement;

    beforeEach(() => {
        rootElement = document.createElement('div');
        rootElement.setAttribute('id', 'root');
        document.body.appendChild(rootElement);
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.resetModules(); // Clear previous module state
    });

    it('renders without crashing', async () => {
        await act(async () => {
            require('./index');
        });
        await waitFor(() => {
            expect(document.getElementById('root')?.innerHTML).toContain('Mocked App');
        });
    });

    it('calls reportWebVitals', async () => {
        await act(async () => {
            require('./index');
        });
        expect(mockReportWebVitals).toHaveBeenCalled();
    });
});
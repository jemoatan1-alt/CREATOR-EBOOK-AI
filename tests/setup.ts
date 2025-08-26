// Test setup file
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test timeout
jest.setTimeout(30000);

// Mock console.warn and console.error in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
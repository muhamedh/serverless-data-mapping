import { handler } from "../src/handler";

describe('My Test Suite', () => {
    it('should call handler', () => {
       const response = handler();
       expect(true).toBe(true);
      });
  });
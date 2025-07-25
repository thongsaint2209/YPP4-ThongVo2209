// src/board/board.test.ts

import { sum } from "../model/board";

test("sum adds two numbers", () => {
  expect(sum(2, 3)).toBe(5);
});

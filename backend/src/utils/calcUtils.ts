import { OpType } from "../models/Calculation";

export function applyOperation(
  left: number,
  right: number,
  op: OpType
): number {
  // console.log("Applying operation:", { left, right, op });
  switch (op) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      if (right === 0) throw new Error("Division by zero");
      return left / right;
    default:
      throw new Error("Invalid operation");
  }
}

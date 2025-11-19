import { Request, Response } from "express";
import { Calculation } from "../models/Calculation";
import { applyOperation } from "../utils/calcUtils";
import { buildTree } from "../utils/treeBuilder";
import { AuthRequest } from "../middleware/auth";

export const getTree = async (req: Request, res: Response) => {
  const all = await Calculation.find({}).sort({ createdAt: 1 }).lean();
  const docs = await Calculation.find({}).sort({ createdAt: 1 });
  const tree = buildTree(docs);
  res.json(tree);
};

export const startNumber = async (req: AuthRequest, res: Response) => {
  const { number } = req.body;
  if (number === undefined)
    return res.status(400).json({ message: "number is required" });

  const calc = new Calculation({
    parentId: null,
    operation: null,
    leftValue: number,
    rightValue: null,
    result: number,
    author: req.user._id,
  });

  await calc.save();
  res.status(201).json(calc);
};

export const respondTo = async (req: AuthRequest, res: Response) => {
  const { parentId } = req.params;
  const { operation, rightValue } = req.body;
  if (!operation || rightValue === undefined)
    return res
      .status(400)
      .json({ message: "operation and rightValue required" });

  const parent = await Calculation.findById(parentId);
  if (!parent) return res.status(404).json({ message: "Parent not found" });

  try {
    const result = applyOperation(parent.result, rightValue, operation);
    const calc = new Calculation({
      parentId: parent._id,
      operation,
      leftValue: parent.result,
      rightValue,
      result,
      author: req.user._id,
    });
    await calc.save();
    res.status(201).json(calc);
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Operation failed" });
  }
};

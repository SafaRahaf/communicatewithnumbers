// src/models/Calculation.ts
import { Schema, model, Document, Types } from "mongoose";

export type OpType = "+" | "-" | "*" | "/";

export interface ICalculation extends Document {
  parentId?: Types.ObjectId | null;
  operation?: OpType | null;
  leftValue: number;
  rightValue?: number | null;
  result: number;
  author: Types.ObjectId;
  createdAt: Date;
}

const CalculationSchema = new Schema<ICalculation>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Calculation",
      default: null,
    },
    operation: { type: String, enum: ["+", "-", "*", "/"], default: null },
    leftValue: { type: Number, required: true },
    rightValue: { type: Number, default: null },
    result: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Calculation = model<ICalculation>(
  "Calculation",
  CalculationSchema
);

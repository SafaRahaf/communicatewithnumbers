import { ICalculation } from "../models/Calculation";

export type CalcNode = ICalculation & {
  children: CalcNode[];
};

export function buildTree(calcs: ICalculation[]): CalcNode[] {
  const map = new Map<string, CalcNode>();
  calcs.forEach((c) => {
    const n: CalcNode = { ...c.toObject(), children: [] };
    map.set(n._id.toString(), n);
  });

  const roots: CalcNode[] = [];
  for (const node of map.values()) {
    if (node.parentId) {
      const parent = map.get(node.parentId.toString());
      if (parent) parent.children!.push(node);
      else roots.push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

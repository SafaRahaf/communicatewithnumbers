import { type CalcNode } from "../../api/calc";
import Node from "./Node";

export default function Tree({
  data,
  refreshTree,
}: {
  data: CalcNode[];
  refreshTree: () => void;
}) {
  return (
    <div>
      {data.map((node) => (
        <Node key={node._id} node={node} refreshTree={refreshTree} />
      ))}
    </div>
  );
}

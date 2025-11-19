import { useState } from "react";
import { respondTo, type CalcNode } from "../../api/calc";
import { useAuth } from "../../context/AuthContext";

interface NodeProps {
  node: CalcNode;
  refreshTree: () => void;
}

export default function Node({ node, refreshTree }: NodeProps) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [operation, setOperation] = useState("+");
  const [value, setValue] = useState("");

  const submit = async () => {
    await respondTo(node._id, operation, Number(value || 0));
    setShowForm(false);
    refreshTree();
  };

  return (
    <div style={{ marginLeft: 20, marginTop: 10 }}>
      <div
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: 6,
          display: "inline-block",
          background: "#fafafa",
        }}
      >
        <strong>{node.result}</strong>

        {node.operation && (
          <span style={{ marginLeft: 10, opacity: 0.7 }}>
            ({node.leftValue} {node.operation} {node.rightValue})
          </span>
        )}

        {user && (
          <button
            style={{ marginLeft: 10 }}
            onClick={() => setShowForm((s) => !s)}
          >
            Reply
          </button>
        )}
      </div>

      {showForm && (
        <div style={{ marginTop: 6 }}>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
          </select>

          <input
            type="number"
            style={{ marginLeft: 6 }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0"
          />

          <button style={{ marginLeft: 6 }} onClick={submit}>
            Submit
          </button>
        </div>
      )}

      {node.children?.map((c) => (
        <Node key={c._id} node={c} refreshTree={refreshTree} />
      ))}
    </div>
  );
}

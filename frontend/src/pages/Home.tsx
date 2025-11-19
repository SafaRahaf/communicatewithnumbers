import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTree, startNumber, type CalcNode } from "../api/calc";
import Tree from "../components/TreeView/Tree";

export default function Home() {
  const { user, logout } = useAuth();
  const [tree, setTree] = useState<CalcNode[]>([]);
  const [startValue, setStartValue] = useState("");

  const loadTree = async () => {
    const data = await getTree();
    setTree(data);
  };

  useEffect(() => {
    loadTree();
  }, []);

  const createStart = async () => {
    await startNumber(startValue === "" ? 0 : Number(startValue));
    setStartValue("");
    loadTree();
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Calculation Tree</h1>

      {user ? (
        <div style={{ marginBottom: 20 }}>
          Logged in as <strong>{user.username}</strong>
          <button style={{ marginLeft: 10 }} onClick={logout}>
            Logout
          </button>
          <div style={{ marginTop: 15 }}>
            <input
              type="number"
              value={startValue}
              onChange={(e) => setStartValue(e.target.value)}
              placeholder="0"
            />
            <button style={{ marginLeft: 8 }} onClick={createStart}>
              Start New Chain
            </button>
          </div>
        </div>
      ) : (
        <p>
          <a href="/login">Login</a> or <a href="/register">Register</a> to
          interact
        </p>
      )}

      <Tree data={tree} refreshTree={loadTree} />
    </div>
  );
}

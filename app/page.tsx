"use client";

import { useState } from "react";

export default function Home() {
  const [span, setSpan] = useState("");
  const [udl, setUdl] = useState("");
  const [E, setE] = useState("");
  const [I, setI] = useState("");

  const [result, setResult] = useState<null | {
    max_bending_moment: number;
    max_deflection: number;
  }>(null);

  const [loading, setLoading] = useState(false);

  async function handleCalculate() {
    setLoading(true);

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          span: Number(span),
          udl: Number(udl),
          E: Number(E),
          I: Number(I),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Calculation failed");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Beam SaaS</h1>

        <div className="space-y-3">
          <input
            className="w-full border p-2 rounded"
            placeholder="Span (m)"
            value={span}
            onChange={(e) => setSpan(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="UDL (kN/m)"
            value={udl}
            onChange={(e) => setUdl(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="E (Pa)"
            value={E}
            onChange={(e) => setE(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="I (m⁴)"
            value={I}
            onChange={(e) => setI(e.target.value)}
          />

          <button
            onClick={handleCalculate}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </div>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <p>
              <strong>Max bending moment:</strong>{" "}
              {result.max_bending_moment.toFixed(3)}
            </p>
            <p>
              <strong>Max deflection:</strong>{" "}
              {result.max_deflection.toExponential(3)}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

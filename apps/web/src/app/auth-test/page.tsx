"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AuthTestPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUp() {
    setLoading(true);
    setResult("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setResult(
        data.session
          ? "Cadastro realizado e sessão iniciada."
          : "Cadastro solicitado. Verifique seu email para confirmar a conta.",
      );
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function signIn() {
    setLoading(true);
    setResult("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setResult("Autenticação realizada com sucesso.");
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function testApi() {
    setLoading(true);
    setResult("");

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (!session) {
        setResult("Faça login antes de testar a API.");
        return;
      }

      const response = await fetch("http://localhost:3001/auth/me", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const body = await response.json();

      setResult(
        JSON.stringify(
          {
            status: response.status,
            body,
          },
          null,
          2,
        ),
      );
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">Mosaic — Authentication Test</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="rounded border p-3 text-white"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="rounded border p-3 text-white"
      />

      <button
        onClick={signUp}
        disabled={loading}
        className="rounded bg-blue-600 p-3 text-white"
      >
        Create test account
      </button>

      <button
        onClick={signIn}
        disabled={loading}
        className="rounded bg-green-600 p-3 text-white"
      >
        Sign in
      </button>

      <button
        onClick={testApi}
        disabled={loading}
        className="rounded bg-purple-600 p-3 text-white"
      >
        Test NestJS API
      </button>

      <pre className="overflow-auto whitespace-pre-wrap rounded border p-4 text-sm">
        {result}
      </pre>
    </main>
  );
}

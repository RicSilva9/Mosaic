"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

const API_URL = "http://localhost:3001";

export default function AuthTestPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function showError(error: unknown) {
    setResult(error instanceof Error ? error.message : "Erro desconhecido");
  }

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
      showError(error);
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
      showError(error);
    } finally {
      setLoading(false);
    }
  }

  async function getAccessToken(): Promise<string> {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    if (!session) {
      throw new Error("Faça login antes de continuar.");
    }

    return session.access_token;
  }

  async function testApi() {
    setLoading(true);
    setResult("");

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
      showError(error);
    } finally {
      setLoading(false);
    }
  }

  async function registerIdentity() {
    setLoading(true);
    setResult("");

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(`${API_URL}/identity/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          username,
          displayName,
        }),
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
      showError(error);
    } finally {
      setLoading(false);
    }
  }

  async function getMosaicProfile() {
    setLoading(true);
    setResult("");

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(`${API_URL}/identity/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
      showError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">Mosaic — Authentication Test</h1>

      <h2 className="text-lg font-semibold">1. Supabase Authentication</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="rounded border p-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="rounded border p-3"
      />

      <button
        onClick={signUp}
        disabled={loading}
        className="rounded bg-blue-600 p-3 text-white disabled:opacity-50"
      >
        Create test account
      </button>

      <button
        onClick={signIn}
        disabled={loading}
        className="rounded bg-green-600 p-3 text-white disabled:opacity-50"
      >
        Sign in
      </button>

      <button
        onClick={testApi}
        disabled={loading}
        className="rounded bg-purple-600 p-3 text-white disabled:opacity-50"
      >
        Test NestJS API
      </button>

      <hr className="my-2" />

      <h2 className="text-lg font-semibold">2. Mosaic Identity Registration</h2>

      <p className="text-sm text-gray-400">
        Sign in with Supabase before registering your Mosaic profile.
      </p>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        minLength={3}
        maxLength={30}
        className="rounded border p-3"
      />

      <input
        type="text"
        placeholder="Display name"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
        minLength={2}
        maxLength={60}
        className="rounded border p-3"
      />

      <button
        onClick={registerIdentity}
        disabled={loading}
        className="rounded bg-indigo-600 p-3 text-white disabled:opacity-50"
      >
        Register Mosaic Profile
      </button>

      <button
        onClick={getMosaicProfile}
        disabled={loading}
        className="rounded bg-teal-600 p-3 text-white disabled:opacity-50"
      >
        Get My Mosaic Profile
      </button>

      <hr className="my-2" />

      <h2 className="text-lg font-semibold">API Response</h2>

      <pre className="overflow-auto whitespace-pre-wrap rounded border p-4 text-sm">
        {result}
      </pre>
    </main>
  );
}

"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { signIn } from "next-auth/webauthn";
import { FormEvent, useEffect, useRef } from "react";

import { DEFAULT_REDIRECT } from "@/lib/routes";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const registerPasskey = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  signIn("passkey", { email: formData.get("email")?.toString(), callbackUrl: DEFAULT_REDIRECT });
};

const setupWebAuthnConditionalUI = async () => {
  const response = await fetch("/api/auth/webauthn-options/passkey?action=authenticate");
  const webauthnOptions = (await response.json()) as unknown as {
    options: Parameters<typeof startAuthentication>[0];
  };
  const authenticatorResponse = await startAuthentication(webauthnOptions.options, true);

  const form = document.querySelector<HTMLFormElement>("#webauthn-form");

  if (!form) return;

  form.method = "POST";
  form.action = "/api/auth/callback/passkey";

  const inputs = [
    { name: "action", value: "authenticate" },
    { name: "callbackUrl", value: DEFAULT_REDIRECT },
    { name: "data", value: JSON.stringify(authenticatorResponse) },
  ];

  for (const { name, value } of inputs) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    input.className = "sr-only";
    form.append(input);
  }

  form.submit();
};

export default function WebAuthnForm({ csrfToken }: { csrfToken: string }) {
  const effectRun = useRef(false);
  useEffect(() => {
    if (!effectRun.current) {
      effectRun.current = true;
      setupWebAuthnConditionalUI();
    }
  }, []);

  return (
    <form
      id="webauthn-form"
      onSubmit={registerPasskey}
      className="flex flex-col items-center justify-center gap-2"
    >
      <input type="hidden" name="csrfToken" value={csrfToken} className="sr-only" />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        required
        autoComplete="username webauthn"
      />
      <Button type="submit">Sign in with Passkey</Button>
    </form>
  );
}

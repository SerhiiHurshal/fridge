"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { signIn } from "next-auth/webauthn";
import { FormEvent } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const registerPasskey = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  signIn("passkey", { email: formData.get("email")?.toString() });
};

const setupWebAuthnConditionalUI = () => {
  fetch("/api/auth/webauthn-options/passkey?action=authenticate")
    .then((resp) => resp.json())
    .then((optionsJSON) => {
      startAuthentication(optionsJSON.options, true);
    })
    .catch((error) => console.error(error));
};

setupWebAuthnConditionalUI();

export default function WebAuthnForm() {
  return (
    <form onSubmit={registerPasskey} className="flex flex-col items-center justify-center gap-2">
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

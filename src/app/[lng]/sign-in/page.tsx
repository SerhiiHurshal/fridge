import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import WebAuthnForm from "@/components/web-authn-form";

export default async function SignIn() {
  return (
    <div className="m-auto mt-16 flex w-[90%] max-w-xl flex-col items-center justify-center gap-4">
      <h2 className="justify-self-center text-2xl">Sign In</h2>
      <WebAuthnForm />
      <div className="border-b-card-foreground w-full border-b" />
      <form
        action={async () => {
          "use server";
          await signIn("github", {
            redirectTo: "/",
          });
        }}
      >
        <Button type="submit">Sign in with GitHub</Button>
      </form>
    </div>
  );
}

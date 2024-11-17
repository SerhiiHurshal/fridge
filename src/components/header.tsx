import { LanguagePicker } from "./language-picker";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex justify-between p-3">
      <p className="px-4 py-2">LOGO</p>
      <div className="flex gap-2">
        <LanguagePicker />
        <Button variant="outline">Sign in</Button>
        <Button>Sign up</Button>
      </div>
    </div>
  );
}

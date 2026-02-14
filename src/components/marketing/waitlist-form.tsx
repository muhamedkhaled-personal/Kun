"use client";

import { useState, useTransition } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { joinWaitlist } from "@/actions/waitlist";
import type { MarketingDictionary } from "@/i18n/types";

export function WaitlistForm({ dict }: { dict: MarketingDictionary }) {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await joinWaitlist({ email, source: "landing" });
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || dict.waitlist.errorDefault);
      }
    });
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-3 py-4">
        <CheckCircle2 className="w-12 h-12 text-[#D4A843]" />
        <p className="text-xl font-semibold text-white">{dict.waitlist.successTitle}</p>
        <p className="text-gray-400">{dict.waitlist.successSubtitle}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <Input
        type="email"
        dir="ltr"
        placeholder={dict.waitlist.placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 h-12 bg-[#1A1A1A] border-[#D4A843]/30 text-white placeholder:text-gray-500 focus-visible:ring-[#D4A843]"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="h-12 px-8 bg-[#D4A843] hover:bg-[#E5B955] text-[#0D0D0D] font-semibold whitespace-nowrap"
      >
        {isPending ? dict.waitlist.submitting : dict.waitlist.submit}
      </Button>
      {error && <p className="text-red-400 text-sm sm:col-span-2">{error}</p>}
    </form>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/actions/user";

interface SettingsFormProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    headline: "",
    field: "",
    language: "en",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUserProfile(formData);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-sm font-medium text-slate-900 block mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900 block mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          disabled
          className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
        />
        <p className="text-xs text-slate-500 mt-1">
          Email cannot be changed. Contact support to update.
        </p>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900 block mb-2">
          Professional Headline
        </label>
        <input
          type="text"
          value={formData.headline}
          onChange={(e) =>
            setFormData({ ...formData, headline: e.target.value })
          }
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
          placeholder="e.g., Product Designer | Startup Advisor"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900 block mb-2">
          Field / Industry
        </label>
        <select
          value={formData.field}
          onChange={(e) =>
            setFormData({ ...formData, field: e.target.value })
          }
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
        >
          <option value="">Select your field</option>
          <option value="tech">Technology</option>
          <option value="marketing">Marketing</option>
          <option value="design">Design</option>
          <option value="business">Business & Entrepreneurship</option>
          <option value="education">Education</option>
          <option value="creative">Creative & Entertainment</option>
          <option value="health">Health & Wellness</option>
          <option value="finance">Finance</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900 block mb-2">
          Language Preference
        </label>
        <select
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="pt">Portuguese</option>
        </select>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-amber-600 hover:bg-amber-700"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

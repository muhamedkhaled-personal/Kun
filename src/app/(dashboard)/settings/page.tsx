import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { SettingsForm } from "@/components/dashboard/settings-form";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <main className="flex-1 overflow-auto pt-6">
      <div className="px-6 max-w-2xl mx-auto pb-12">
        <PageHeader
          title="Account Settings"
          description="Manage your profile and preferences"
        />

        {/* Profile Settings Card */}
        <Card className="p-8 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Profile Information
          </h2>
          <SettingsForm user={session.user} />
        </Card>

        {/* Additional Settings */}
        <Card className="p-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Preferences
          </h2>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-900 block mb-2">
                Email Notifications
              </label>
              <p className="text-sm text-slate-600 mb-4">
                Receive updates about your strategy and content ideas
              </p>
              <div className="space-y-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700">
                    Weekly strategy tips
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700">
                    New content ideas
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700">
                    Product updates
                  </span>
                </label>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

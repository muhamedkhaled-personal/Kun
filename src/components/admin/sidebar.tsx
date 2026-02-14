/**
 * Admin Sidebar Component
 *
 * Client-side admin navigation sidebar.
 * Features:
 * - Admin-specific navigation items (Overview, Users, Analytics)
 * - Back to Dashboard link
 * - User profile section with sign-out
 * - Active route highlighting with gold accent
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { signOut } from "next-auth/react";

interface AdminSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

const adminNavItems = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Admin dashboard overview",
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    description: "Manage platform users",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "Platform analytics and insights",
  },
];

const backToDashboardItem = {
  label: "Back to Dashboard",
  href: "/dashboard",
  icon: ArrowLeft,
  separator: true,
};

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {/* Admin Nav Items */}
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={active ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  active
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Button>
            </Link>
          );
        })}

        {/* Separator */}
        <div className="my-4 border-t border-slate-700" />

        {/* Back to Dashboard */}
        <Link href={backToDashboardItem.href}>
          <Button
            variant={isActive(backToDashboardItem.href) ? "default" : "ghost"}
            className={`w-full justify-start gap-3 ${
              isActive(backToDashboardItem.href)
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "text-slate-300 hover:text-white hover:bg-slate-800"
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{backToDashboardItem.label}</span>
          </Button>
        </Link>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.image || ""} alt={user.name || "Admin"} />
            <AvatarFallback className="bg-amber-600 text-white text-xs font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.name || "Admin"}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user.email || "admin@kun.ai"}
            </p>
          </div>
        </div>

        <Button
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </Button>
      </div>
    </aside>
  );
}

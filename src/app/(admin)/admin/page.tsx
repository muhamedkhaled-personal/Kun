/**
 * Admin Overview Page
 *
 * Server-side admin dashboard showing:
 * - Quick stats (Total Users, Active Subscriptions, Discovery Sessions Today, Revenue)
 * - Recent signups table (last 10 users)
 * - Status badges and styling consistent with Kun design
 */

import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, Zap, TrendingUp } from "lucide-react";

// Placeholder data — replace with real database queries
const stats = [
  {
    label: "Total Users",
    value: "1,247",
    description: "Active users on platform",
    icon: Users,
    trend: "+12% from last month",
  },
  {
    label: "Active Subscriptions",
    value: "342",
    description: "Paid plans",
    icon: CheckCircle,
    trend: "+8% from last month",
  },
  {
    label: "Discovery Sessions",
    value: "89",
    description: "Sessions completed today",
    icon: Zap,
    trend: "+15% from yesterday",
  },
  {
    label: "Revenue (MRR)",
    value: "$12,450",
    description: "Monthly recurring revenue",
    icon: TrendingUp,
    trend: "+5% from last month",
  },
];

// Placeholder data for recent signups
const recentSignups = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    plan: "pro",
    joinedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    email: "m.rodriguez@example.com",
    plan: "free",
    joinedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: "3",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    plan: "business",
    joinedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: "4",
    name: "James Park",
    email: "james.park@example.com",
    plan: "pro",
    joinedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    id: "5",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    plan: "free",
    joinedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
];

const getPlanBadgeVariant = (plan: string) => {
  switch (plan) {
    case "free":
      return "secondary";
    case "pro":
      return "default";
    case "business":
      return "default";
    default:
      return "secondary";
  }
};

const getPlanBadgeClass = (plan: string) => {
  switch (plan) {
    case "business":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "pro":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "free":
      return "bg-gray-100 text-gray-800 border-gray-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Admin Dashboard"
        description="Manage Kun platform, users, and view analytics"
      />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {stat.description}
                </p>
                <p className="text-xs text-amber-600 font-medium mt-2">
                  {stat.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Signups Table */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Recent Signups</CardTitle>
          <CardDescription>
            Last {recentSignups.length} users to join the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentSignups.map((signup) => (
                  <tr
                    key={signup.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-slate-900 font-medium">
                      {signup.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {signup.email}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={getPlanBadgeVariant(signup.plan)}
                        className={`capitalize ${getPlanBadgeClass(
                          signup.plan
                        )}`}
                      >
                        {signup.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {formatDate(signup.joinedDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

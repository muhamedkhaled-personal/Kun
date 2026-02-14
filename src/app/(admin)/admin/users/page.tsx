/**
 * Admin Users Management Page
 *
 * Server-side users management page showing:
 * - Table of all users with name, email, plan, role, and joined date
 * - Status badges for different plan types
 * - Clean table layout for user administration
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

// Placeholder user data — replace with real database queries
const allUsers = [
  {
    id: "user_1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    plan: "pro",
    role: "user",
    joinedDate: new Date("2024-12-15"),
  },
  {
    id: "user_2",
    name: "Michael Rodriguez",
    email: "m.rodriguez@example.com",
    plan: "free",
    role: "user",
    joinedDate: new Date("2024-12-10"),
  },
  {
    id: "user_3",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    plan: "business",
    role: "user",
    joinedDate: new Date("2024-12-08"),
  },
  {
    id: "user_4",
    name: "James Park",
    email: "james.park@example.com",
    plan: "pro",
    role: "user",
    joinedDate: new Date("2024-12-05"),
  },
  {
    id: "user_5",
    name: "Lisa Wang",
    email: "lisa.wang@example.com",
    plan: "free",
    role: "user",
    joinedDate: new Date("2024-11-28"),
  },
  {
    id: "user_6",
    name: "David Kim",
    email: "david.kim@example.com",
    plan: "pro",
    role: "user",
    joinedDate: new Date("2024-11-20"),
  },
  {
    id: "user_7",
    name: "Sophie Laurent",
    email: "sophie.laurent@example.com",
    plan: "business",
    role: "user",
    joinedDate: new Date("2024-11-15"),
  },
  {
    id: "user_8",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    plan: "free",
    role: "user",
    joinedDate: new Date("2024-11-10"),
  },
  {
    id: "user_9",
    name: "Isabella Rossi",
    email: "isabella.rossi@example.com",
    plan: "pro",
    role: "user",
    joinedDate: new Date("2024-11-05"),
  },
  {
    id: "user_10",
    name: "Marcus Thompson",
    email: "marcus.t@example.com",
    plan: "free",
    role: "user",
    joinedDate: new Date("2024-10-28"),
  },
  {
    id: "user_11",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@example.com",
    plan: "business",
    role: "user",
    joinedDate: new Date("2024-10-20"),
  },
  {
    id: "user_12",
    name: "Carlos Rodriguez",
    email: "carlos.r@example.com",
    plan: "pro",
    role: "user",
    joinedDate: new Date("2024-10-15"),
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

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-800 border-red-300";
    case "user":
      return "bg-green-100 text-green-800 border-green-300";
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

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Users Management"
        description="View and manage all platform users"
      />

      {/* Users Table Card */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Total: {allUsers.length} users on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
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
                    Role
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Joined Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-slate-900 font-medium">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={getPlanBadgeVariant(user.plan)}
                        className={`capitalize ${getPlanBadgeClass(
                          user.plan
                        )}`}
                      >
                        {user.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className={`capitalize ${getRoleBadgeClass(user.role)}`}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {formatDate(user.joinedDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Free Plan Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {allUsers.filter((u) => u.plan === "free").length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {(
                (allUsers.filter((u) => u.plan === "free").length /
                  allUsers.length) *
                100
              ).toFixed(1)}
              % of users
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pro Plan Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {allUsers.filter((u) => u.plan === "pro").length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {(
                (allUsers.filter((u) => u.plan === "pro").length /
                  allUsers.length) *
                100
              ).toFixed(1)}
              % of users
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Business Plan Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {allUsers.filter((u) => u.plan === "business").length}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {(
                (allUsers.filter((u) => u.plan === "business").length /
                  allUsers.length) *
                100
              ).toFixed(1)}
              % of users
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

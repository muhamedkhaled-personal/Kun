/**
 * Admin Analytics Page
 *
 * Server-side analytics overview page showing:
 * - Total Discovery Sessions
 * - Completion Rate
 * - Popular Fields
 * - Most Chosen Platforms
 * - Placeholder cards for future analytics implementation
 */

import { PageHeader } from "@/components/shared/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Zap,
  TrendingUp,
  Tag,
  Smartphone,
  Users,
  CheckCircle,
} from "lucide-react";

// Placeholder analytics data
const discoveryMetrics = [
  {
    label: "Total Discovery Sessions",
    value: "3,247",
    description: "All time discovery sessions completed",
    icon: Zap,
    trend: "+12% from last month",
  },
  {
    label: "Completion Rate",
    value: "72.4%",
    description: "Percentage of sessions completed",
    icon: CheckCircle,
    trend: "+2.1% from last month",
  },
];

// Top fields of expertise
const popularFields = [
  { name: "Technology & Innovation", count: 324, percentage: 18.2 },
  { name: "Marketing & Communication", count: 298, percentage: 16.8 },
  { name: "Business & Entrepreneurship", count: 267, percentage: 15.1 },
  { name: "Design & Creativity", count: 245, percentage: 13.8 },
  { name: "Leadership & Management", count: 198, percentage: 11.2 },
  { name: "Finance & Economics", count: 156, percentage: 8.8 },
  { name: "Education & Development", count: 134, percentage: 7.6 },
  { name: "Other Fields", count: 113, percentage: 6.4 },
];

// Most chosen platforms for content creation
const mostChosenPlatforms = [
  { name: "LinkedIn", count: 892, percentage: 28.5 },
  { name: "Twitter/X", count: 654, percentage: 20.9 },
  { name: "Personal Blog", count: 512, percentage: 16.4 },
  { name: "Medium", count: 384, percentage: 12.3 },
  { name: "YouTube", count: 276, percentage: 8.8 },
  { name: "Instagram", count: 198, percentage: 6.3 },
  { name: "TikTok", count: 78, percentage: 2.5 },
  { name: "Other Platforms", count: 54, percentage: 1.7 },
];

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Analytics"
        description="Platform analytics and user insights"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {discoveryMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {metric.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {metric.value}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {metric.description}
                </p>
                <p className="text-xs text-amber-600 font-medium mt-2">
                  {metric.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Popular Fields and Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Popular Fields */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-amber-600" />
              Popular Fields of Expertise
            </CardTitle>
            <CardDescription>
              Most common fields chosen by users in discovery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularFields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">
                      {field.name}
                    </span>
                    <span className="text-sm text-slate-600">
                      {field.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${field.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatNumber(field.count)} users
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Most Chosen Platforms */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-amber-600" />
              Most Chosen Platforms
            </CardTitle>
            <CardDescription>
              Preferred platforms for content creation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mostChosenPlatforms.map((platform) => (
                <div key={platform.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">
                      {platform.name}
                    </span>
                    <span className="text-sm text-slate-600">
                      {platform.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${platform.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-500">
                    {formatNumber(platform.count)} users
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-600" />
              Average Session Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12m 34s</div>
            <p className="text-xs text-slate-500 mt-1">
              Average time to complete discovery
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              Dropout Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">27.6%</div>
            <p className="text-xs text-slate-500 mt-1">
              Percentage who abandon discovery
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-600" />
              Repeat Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">34.2%</div>
            <p className="text-xs text-slate-500 mt-1">
              Users who retake discovery
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for future analytics charts */}
      <Card className="border-slate-200 border-dashed">
        <CardHeader>
          <CardTitle>Advanced Analytics</CardTitle>
          <CardDescription>
            More detailed analytics charts coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">
                Advanced charts and detailed analytics will be available soon
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Including conversion funnels, cohort analysis, and custom reports
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

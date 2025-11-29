"use client";

import QuickActionCards from "@/components/features/web/dashboard/QuickActionCards";
import RecentRecipes from "@/components/features/web/dashboard/RecentRecipes";
import UserProfileCard from "@/components/features/web/dashboard/UserProfileCard";
import UserStats from "@/components/features/web/dashboard/UserStats";

export default function UserPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Profile Section */}
        <UserProfileCard />

        {/* Quick Actions */}
        <QuickActionCards />

        {/* Stats Grid */}
        <UserStats />

        {/* Recent Recipes */}
        <RecentRecipes />
      </div>
    </div>
  );
}

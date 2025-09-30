"use client";

import { useUser } from '@/contexts/user-context';
import { employeeProfiles } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function DevelopmentPlanPage() {
  const { user } = useUser();
  const profile = employeeProfiles.find((p) => p.userId === user?.id);

  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Not Found</CardTitle>
          <CardDescription>
            Your employee profile has not been set up yet.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Development Plan Progress</CardTitle>
            <CardDescription>
              Track your activities towards your goal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.developmentPlan.map((activity) => (
              <div key={activity.id}>
                <div className="flex justify-between text-sm">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-muted-foreground">{activity.status}</p>
                </div>
                <Progress
                  value={
                    activity.status === 'Completed'
                      ? 100
                      : activity.status === 'In Progress'
                      ? 50
                      : 0
                  }
                  className="mt-2 h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>
    </div>
  );
}

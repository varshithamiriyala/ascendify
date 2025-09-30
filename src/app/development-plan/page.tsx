"use client";

import * as React from 'react';
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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { CareerGoals } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

export default function DevelopmentPlanPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const profile = employeeProfiles.find((p) => p.userId === user?.id);

  const [careerGoals, setCareerGoals] = React.useState<CareerGoals>({
    shortTerm: '',
    longTerm: '',
  });

  React.useEffect(() => {
    if (profile) {
      setCareerGoals(profile.careerGoals);
    }
  }, [profile]);

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

  const handleSaveGoals = () => {
    // In a real app, you would save this to a database.
    console.log('Saving career goals:', careerGoals);
    toast({
      title: 'Goals Saved',
      description: 'Your career goals have been updated.',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
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

      <div className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Career Goal Alignment</CardTitle>
            <CardDescription>
              Set your goals to receive aligned development recommendations from AI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="short-term-goals">Short-Term Goals</Label>
              <Textarea
                id="short-term-goals"
                placeholder="e.g., Master a new technology, lead a feature."
                value={careerGoals.shortTerm}
                onChange={(e) =>
                  setCareerGoals({ ...careerGoals, shortTerm: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="long-term-goals">Long-Term Goals</Label>
              <Textarea
                id="long-term-goals"
                placeholder="e.g., Transition to a new role, become a domain expert."
                value={careerGoals.longTerm}
                onChange={(e) =>
                  setCareerGoals({ ...careerGoals, longTerm: e.target.value })
                }
              />
            </div>
            <Button onClick={handleSaveGoals} className="w-full">
              Save Goals
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

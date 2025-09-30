"use client";

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { allUsers, employeeProfiles } from '@/lib/data';
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
import { ArrowLeft } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function EmployeeDevelopmentPlanPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const { toast } = useToast();
  const profile = employeeProfiles.find((p) => p.userId === userId);
  const user = allUsers.find(u => u.id === userId);

  const [careerGoals, setCareerGoals] = React.useState<CareerGoals>({
    shortTerm: '',
    longTerm: '',
  });

  React.useEffect(() => {
    if (profile) {
      setCareerGoals(profile.careerGoals);
    }
  }, [profile]);

  if (!profile || !user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Not Found</CardTitle>
          <CardDescription>
            This employee profile could not be found.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
            </Button>
        </CardContent>
      </Card>
    );
  }

  const handleSaveGoals = () => {
    // In a real app, you would save this to a database.
    console.log('Saving career goals:', careerGoals);
    toast({
      title: 'Goals Saved',
      description: `Career goals for ${user.name} have been updated.`,
    });
  };

  return (
    <div className="space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        </Button>

        <Card>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                 <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                    <CardDescription>
                        Development Plan for the <span className="font-semibold text-primary">{profile.targetRole}</span> role.
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Development Plan Progress</CardTitle>
              <CardDescription>
                Track activities towards their goal.
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
                Set goals to receive aligned development recommendations from AI.
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
    </div>
  );
}

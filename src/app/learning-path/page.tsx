"use client";

import { useUser } from '@/contexts/user-context';
import { employeeProfiles, learningPathSteps } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, ListTodo } from 'lucide-react';


export default function LearningPathPage() {
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
            <CardTitle>AI-Generated Learning Path</CardTitle>
            <CardDescription>
              Your personalized roadmap to success for the <span className="font-semibold text-primary">{profile.targetRole}</span> role.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-8 pl-6 before:absolute before:inset-y-0 before:left-8 before:w-px before:bg-border">
              {learningPathSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="absolute top-1 -left-[30px] z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <ListTodo className="h-5 w-5" />
                  </div>
                  <div className="ml-6">
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                    <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                      {step.milestones.map((milestone, mIndex) => (
                        <li key={mIndex} className="flex items-start">
                          <CheckCircle2 className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

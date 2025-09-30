"use client";

import { useUser } from '@/contexts/user-context';
import {
  employeeProfiles,
} from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import ReadinessScoreChart from '../readiness-score-chart';
import { Badge } from '../ui/badge';
import {
  Trophy,
  Target,
  FlaskConical,
  Lightbulb,
} from 'lucide-react';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

export default function EmployeeView() {
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column */}
      <div className="col-span-1 space-y-6 lg:col-span-2">
        {/* Welcome & Readiness */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              Welcome back, {user?.name.split(' ')[0]}!
            </CardTitle>
            <CardDescription>
              You are {profile.readiness}% ready for the{' '}
              <span className="font-semibold text-primary">
                {profile.targetRole}
              </span>{' '}
              role.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <ReadinessScoreChart score={profile.readiness} />
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">My Rewards</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.gamification.badges.map((badge) => (
                    <Badge variant="secondary" key={badge}>
                      <Trophy className="mr-1.5 h-3.5 w-3.5 text-yellow-500" />
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Points Earned</h3>
                <p className="text-2xl font-bold text-primary">
                  {profile.gamification.points.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="col-span-1 space-y-6">
        {/* Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Gap Analysis</CardTitle>
            <CardDescription>Areas for your development.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-accent" />
                    <span>Competency Gaps</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pt-2">
                    {profile.competencyGaps.map((gap) => (
                      <li key={gap.id} className="text-sm">
                        <div className="flex justify-between">
                          <span>{gap.name}</span>
                          <span className="font-mono text-muted-foreground">
                            {gap.level}/{gap.target}
                          </span>
                        </div>
                        <Progress value={(gap.level / gap.target) * 100} className="mt-1 h-1" />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-2">
                    <FlaskConical className="h-5 w-5 text-accent" />
                    <span>Experience Gaps</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc space-y-2 pl-5 pt-2 text-sm">
                    {profile.experienceGaps.map((gap) => (
                      <li key={gap.id}>{gap.name}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Recommendations</CardTitle>
            <CardDescription>
              Opportunities tailored for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.recommendations.map((rec, index) => (
              <div key={index}>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Lightbulb className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {rec.reason}
                    </p>
                  </div>
                </div>
                {index < profile.recommendations.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { SkillHeatmap } from '@/components/skill-heatmap';
import type { Competency } from '@/lib/types';

export default function SelfAssessmentPage() {
  const { user } = useUser();
  const profile = employeeProfiles.find((p) => p.userId === user?.id);

  const [selfAssessments, setSelfAssessments] = React.useState<
    Record<string, number>
  >({});

  React.useEffect(() => {
    if (profile) {
      const initialAssessments = profile.competencyGaps.reduce(
        (acc, gap) => {
          acc[gap.id] = gap.level;
          return acc;
        },
        {} as Record<string, number>
      );
      setSelfAssessments(initialAssessments);
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

  const handleSliderChange = (id: string, value: number[]) => {
    setSelfAssessments((prev) => ({ ...prev, [id]: value[0] }));
  };

  const chartData = profile.competencyGaps.map((gap) => ({
    ...gap,
    selfLevel: selfAssessments[gap.id],
  }));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Self-Assessment Survey</CardTitle>
            <CardDescription>
              Rate your proficiency in each competency area. Your feedback helps
              personalize your development plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {profile.competencyGaps.map((gap) => (
              <div key={gap.id} className="space-y-3">
                <Label htmlFor={`slider-${gap.id}`}>{gap.name}</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id={`slider-${gap.id}`}
                    min={0}
                    max={gap.target}
                    step={1}
                    value={[selfAssessments[gap.id] || 0]}
                    onValueChange={(value) => handleSliderChange(gap.id, value)}
                  />
                  <div className="w-12 text-right font-mono text-primary">
                    {selfAssessments[gap.id] || 0} / {gap.target}
                  </div>
                </div>
              </div>
            ))}
            <Button>Submit Assessments</Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <SkillHeatmap data={chartData} />
      </div>
    </div>
  );
}

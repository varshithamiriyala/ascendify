"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { employeeProfiles, allUsers, developmentActivities } from '@/lib/data';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { WhatIfScenarioDialog } from '../what-if-scenario-dialog';
import type { EmployeeProfile, User, DevelopmentActivity } from '@/lib/types';


export default function CommitteeView() {
  const [selectedSuccessor, setSelectedSuccessor] = useState<(EmployeeProfile & User) | null>(null);
  const [isSimulationOpen, setSimulationOpen] = useState(false);

  const successors = employeeProfiles.map(profile => {
    const user = allUsers.find(u => u.id === profile.userId);
    return { ...profile, ...user! };
  }).sort((a, b) => b.readiness - a.readiness);

  const handleSimulate = (successor: EmployeeProfile & User) => {
    setSelectedSuccessor(successor);
    setSimulationOpen(true);
  };

  const handleSimulationRun = (activity: DevelopmentActivity) => {
    // In a real app, you'd call the AI flow here to get a new readiness score.
    // For now, we'll simulate an increase.
    if (selectedSuccessor) {
      const currentReadiness = selectedSuccessor.readiness;
      const newReadiness = Math.min(100, currentReadiness + Math.floor(Math.random() * 10) + 5);
      alert(`Simulating "${activity.title}" for ${selectedSuccessor.name}.\n\nOriginal Readiness: ${currentReadiness}%\nEstimated New Readiness: ${newReadiness}%`);
      setSimulationOpen(false);
    }
  }


  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Successor Comparison</CardTitle>
            <CardDescription>
              Review potential successors for key roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Employee</TableHead>
                  <TableHead>Target Role</TableHead>
                  <TableHead className="text-center">Readiness Score</TableHead>
                  <TableHead className="text-center">Readiness</TableHead>
                  <TableHead className="text-center">Gaps</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {successors.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={s.avatarUrl} alt={s.name} />
                          <AvatarFallback>{s.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{s.name}</p>
                          <p className="text-sm text-muted-foreground">{s.title}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{s.targetRole}</TableCell>
                    <TableCell className="text-center font-semibold">{s.readiness}%</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Progress value={s.readiness} className="h-2 w-24" />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{s.competencyGaps.length} Comp. / {s.experienceGaps.length} Exp.</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleSimulate(s)}>What-if Scenario</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      {selectedSuccessor && (
        <WhatIfScenarioDialog
          isOpen={isSimulationOpen}
          onOpenChange={setSimulationOpen}
          successor={selectedSuccessor}
          activities={developmentActivities}
          onSimulate={handleSimulationRun}
        />
      )}
    </>
  );
}

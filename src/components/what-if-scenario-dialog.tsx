"use client";

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from './ui/button';
import { Label } from './ui/label';
import type { EmployeeProfile, User, DevelopmentActivity } from '@/lib/types';

interface WhatIfScenarioDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  successor: EmployeeProfile & User;
  activities: DevelopmentActivity[];
  onSimulate: (activity: DevelopmentActivity) => void;
}

export function WhatIfScenarioDialog({
  isOpen,
  onOpenChange,
  successor,
  activities,
  onSimulate,
}: WhatIfScenarioDialogProps) {
  const [selectedActivityId, setSelectedActivityId] = React.useState<string | undefined>();

  const handleSimulateClick = () => {
    if (selectedActivityId) {
      const activity = activities.find(a => a.id === selectedActivityId);
      if (activity) {
        onSimulate(activity);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>What-if Scenario Simulation</DialogTitle>
          <DialogDescription>
            Simulate the impact of a development activity on{' '}
            <span className="font-bold text-foreground">{successor.name}</span>'s readiness for the{' '}
            <span className="font-bold text-foreground">{successor.targetRole}</span> role.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
            <div className="space-y-2">
                <Label>Current Readiness</Label>
                <p className="text-2xl font-bold text-primary">{successor.readiness}%</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="activity-select">Select Development Activity</Label>
                 <Select onValueChange={setSelectedActivityId} value={selectedActivityId}>
                    <SelectTrigger id="activity-select">
                        <SelectValue placeholder="Choose an activity..." />
                    </SelectTrigger>
                    <SelectContent>
                        {activities.map(activity => (
                            <SelectItem key={activity.id} value={activity.id}>
                                {activity.title} ({activity.type})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSimulateClick} disabled={!selectedActivityId}>
            Run Simulation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const trainingEffectivenessData = [
  { id: 1, name: "Advanced System Design", improvement: 15, participants: 25 },
  { id: 2, name: "Project Leadership 101", improvement: 12, participants: 40 },
  { id: 3, name: "Mentorship Fundamentals", improvement: 10, participants: 30 },
  { id: 4, name: "Agile Leadership Workshop", improvement: 8, participants: 50 },
  { id: 5, name: "Microservices Architecture", improvement: 18, participants: 20 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Training Program Effectiveness</CardTitle>
          <CardDescription>
            Track which trainings and projects yield the highest readiness improvements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Training Program</TableHead>
                <TableHead className="text-center">Participants</TableHead>
                <TableHead className="text-center">Avg. Readiness Improvement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingEffectivenessData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-center">{item.participants}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold w-10 text-right">{item.improvement}%</span>
                      <Progress value={item.improvement} className="h-2 w-32" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

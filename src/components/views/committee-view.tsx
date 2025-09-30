"use client";

import Image from 'next/image';
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
import { employeeProfiles, allUsers } from '@/lib/data';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';

export default function CommitteeView() {
  const successors = employeeProfiles.map(profile => {
    const user = allUsers.find(u => u.userId === profile.userId);
    return { ...profile, ...user };
  });

  return (
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
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                       <span className="font-semibold">{s.readiness}%</span>
                       <Progress value={s.readiness} className="h-2 w-24" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{s.competencyGaps.length} Comp. / {s.experienceGaps.length} Exp.</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View Details</Button>
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

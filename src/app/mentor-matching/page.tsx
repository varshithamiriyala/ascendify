"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allUsers, employeeProfiles } from "@/lib/data";

const mentorSuggestions = [
  { menteeId: '1', mentorId: '3', reason: "System Design, Project Leadership" },
  { menteeId: '2', mentorId: '3', reason: "Product Strategy, Market Analysis" },
];

export default function MentorMatchingPage() {
  const suggestions = mentorSuggestions.map(s => {
    const mentee = allUsers.find(u => u.id === s.menteeId);
    const mentor = allUsers.find(u => u.id === s.mentorId);
    const menteeProfile = employeeProfiles.find(p => p.userId === s.menteeId);
    return { mentee, mentor, menteeProfile, reason: s.reason };
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Mentor Matching</CardTitle>
          <CardDescription>
            Connect employees with the right mentors to accelerate their growth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mentee</TableHead>
                <TableHead>Top Gaps</TableHead>
                <TableHead>Suggested Mentor</TableHead>
                <TableHead>Match Reason</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suggestions.map((s) => (
                <TableRow key={s.mentee?.id}>
                  <TableCell>
                     <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={s.mentee?.avatarUrl} alt={s.mentee?.name} />
                        <AvatarFallback>{s.mentee?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{s.mentee?.name}</p>
                        <p className="text-sm text-muted-foreground">{s.mentee?.title}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {s.menteeProfile?.competencyGaps.slice(0, 2).map(gap => (
                        <Badge variant="outline" key={gap.id}>{gap.name}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                     <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={s.mentor?.avatarUrl} alt={s.mentor?.name} />
                        <AvatarFallback>{s.mentor?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{s.mentor?.name}</p>
                        <p className="text-sm text-muted-foreground">{s.mentor?.title}</p>
                      </div>
                    </div>
                  </TableCell>
                   <TableCell>
                    <Badge variant="secondary">{s.reason}</Badge>
                   </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">Send Invite</Button>
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

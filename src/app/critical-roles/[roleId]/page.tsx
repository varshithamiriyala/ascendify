"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { allUsers, employeeProfiles } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const criticalRoles = [
    { id: 'cr1', title: 'Senior Software Engineer', successors: 1, readyNow: 0, ready1Year: 1, ready2Years: 0 },
    { id: 'cr2', title: 'Senior Product Manager', successors: 1, readyNow: 0, ready1Year: 1, ready2Years: 0 },
    { id: 'cr3', title: 'Director of Engineering', successors: 0, readyNow: 0, ready1Year: 0, ready2Years: 0 },
];

export default function PipelineDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const roleId = params.roleId as string;

    const role = criticalRoles.find(r => r.id === roleId);

    const successors = employeeProfiles
        .filter(p => p.targetRole === role?.title)
        .map(profile => {
            const user = allUsers.find(u => u.id === profile.userId);
            return { ...profile, ...user! };
        })
        .sort((a, b) => b.readiness - a.readiness);

    if (!role) {
        return <div>Role not found</div>;
    }

    return (
        <div className="space-y-6">
            <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Critical Roles
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle>Successor Pipeline: {role.title}</CardTitle>
                    <CardDescription>
                        Detailed view of potential successors and their readiness.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Employee</TableHead>
                                <TableHead>Current Role</TableHead>
                                <TableHead className="text-center">Readiness</TableHead>
                                <TableHead className="text-center">Top Gaps</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {successors.length > 0 ? (
                                successors.map(s => (
                                    <TableRow key={s.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={s.avatarUrl} alt={s.name} />
                                                    <AvatarFallback>{s.name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{s.name}</p>
                                                    <p className="text-sm text-muted-foreground">{s.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{s.title}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="font-semibold">{s.readiness}%</span>
                                                <Progress value={s.readiness} className="h-2 w-24" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col items-center gap-1">
                                                {s.competencyGaps.slice(0, 2).map(gap => (
                                                    <Badge variant="outline" key={gap.id}>{gap.name}</Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => router.push(`/development-plan/${s.userId}`)}>View Plan</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                                        No successors identified for this role.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

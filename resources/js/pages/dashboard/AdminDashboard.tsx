import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import { Activity, BookOpen, ClipboardList, Clock, Download, LayoutDashboard, Settings, TrendingUp, UserPlus, Users } from 'lucide-react';
import { JSX } from 'react';

export default function AdminDashboard() {
    const { auth, systemStats, recentActivity } = usePage<SharedData>().props;

    const getActivityIcon = (type: string) => {
        const icons: Record<string, JSX.Element> = {
            user: <UserPlus className="h-4 w-4 text-green-500" />,
            consultation: <ClipboardList className="h-4 w-4 text-blue-500" />,
            system: <Settings className="h-4 w-4 text-orange-500" />,
            area: <LayoutDashboard className="h-4 w-4 text-purple-500" />,
            role: <UserPlus className="h-4 w-4 text-indigo-500" />,
        };
        return icons[type] ?? <Activity className="h-4 w-4 text-gray-500" />;
    };

    if (!systemStats || !recentActivity) {
        return (
            <div className="space-y-6 p-6">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-28 rounded-md" />
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-12 rounded-md" />
                        ))}
                    </div>
                    <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-8 rounded-md" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen space-y-6 bg-gray-50 p-6 dark:bg-gray-900">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Welcome back, {auth.user.name}! Here's what's happening with your system today.
                    </p>
                </div>
                <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                </Button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        title: 'Total Users',
                        value: systemStats.totalUsers,
                        icon: <Users className="h-12 w-12 text-blue-500 opacity-80" />,
                        color: 'blue',
                        extra: (
                            <>
                                <TrendingUp className="mr-1 h-3 w-3" />+{systemStats.monthlyGrowth}% this month
                            </>
                        ),
                    },
                    {
                        title: 'Students',
                        value: systemStats.students,
                        icon: <BookOpen className="h-12 w-12 text-green-500 opacity-80" />,
                        color: 'green',
                        extra: (
                            <>
                                <Progress value={(systemStats.students / systemStats.totalUsers) * 100} className="mr-2 h-1 w-16" />
                                {Math.round((systemStats.students / systemStats.totalUsers) * 100)}%
                            </>
                        ),
                    },
                    {
                        title: 'Faculty',
                        value: systemStats.faculty,
                        icon: <ClipboardList className="h-12 w-12 text-purple-500 opacity-80" />,
                        color: 'purple',
                        extra: (
                            <>
                                <Progress value={(systemStats.faculty / systemStats.totalUsers) * 100} className="mr-2 h-1 w-16" />
                                {Math.round((systemStats.faculty / systemStats.totalUsers) * 100)}%
                            </>
                        ),
                    },
                    {
                        title: 'Active Sessions',
                        value: systemStats.activeConsultations,
                        icon: <Activity className="h-12 w-12 text-orange-500 opacity-80" />,
                        color: 'orange',
                        extra: (
                            <>
                                <Clock className="mr-1 h-3 w-3" />
                                {systemStats.completedToday} completed today
                            </>
                        ),
                    },
                ].map((stat, i) => (
                    <Card
                        key={i}
                        className={`border-0 bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 shadow-sm dark:from-${stat.color}-900/20 dark:to-${stat.color}-800/20`}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-sm font-medium text-${stat.color}-700 dark:text-${stat.color}-300`}>{stat.title}</p>
                                    <p className={`text-3xl font-bold text-${stat.color}-900 dark:text-${stat.color}-100`}>{stat.value}</p>
                                    <div className={`mt-2 flex items-center text-xs text-${stat.color}-600 dark:text-${stat.color}-400`}>
                                        {stat.extra}
                                    </div>
                                </div>
                                {stat.icon}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Quick Actions */}
                <div className="lg:col-span-2">
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                                <LayoutDashboard className="h-5 w-5" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {[
                                {
                                    href: '/users',
                                    title: 'Manage Users',
                                    subtitle: 'Students & Faculty',
                                    icon: <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
                                    bg: 'bg-blue-100 dark:bg-blue-900/40',
                                    hover: 'hover:border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20',
                                },
                                {
                                    href: '/consultation-areas',
                                    title: 'Consultation Areas',
                                    subtitle: 'Define & Manage',
                                    icon: <LayoutDashboard className="h-5 w-5 text-green-600 dark:text-green-400" />,
                                    bg: 'bg-green-100 dark:bg-green-900/40',
                                    hover: 'hover:border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20',
                                },
                                {
                                    href: '/system-settings',
                                    title: 'System Settings',
                                    subtitle: 'Configuration',
                                    icon: <Settings className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
                                    bg: 'bg-purple-100 dark:bg-purple-900/40',
                                    hover: 'hover:border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/20',
                                },
                                {
                                    href: '/consultations',
                                    title: 'Activity Monitor',
                                    subtitle: 'All Consultations',
                                    icon: <ClipboardList className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
                                    bg: 'bg-orange-100 dark:bg-orange-900/40',
                                    hover: 'hover:border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/20',
                                },
                            ].map((item, i) => (
                                <Link key={i} href={item.href}>
                                    <Button variant="outline" className={`h-auto w-full justify-start p-4 transition-colors ${item.hover}`}>
                                        <div className="flex items-center gap-3">
                                            <div className={`rounded-lg p-2 ${item.bg}`}>{item.icon}</div>
                                            <div className="text-left">
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.subtitle}</p>
                                            </div>
                                        </div>
                                    </Button>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity */}
                <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-0">
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                            <Activity className="h-5 w-5" />
                            Recent Activity
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="my-4 max-h-80 space-y-4 overflow-y-auto pr-1">
                            {(recentActivity || []).length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity yet.</p>
                            ) : (
                                (recentActivity || []).map((activity, index) => (
                                    <div key={activity.id} className="space-y-1">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{activity.action}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user}</p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                        {index < recentActivity.length - 1 && <Separator className="my-3" />}
                                    </div>
                                ))
                            )}
                        </div>

                        <Button variant="outline" size="sm" className="w-full" disabled>
                            View All Activity (Coming Soon)
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

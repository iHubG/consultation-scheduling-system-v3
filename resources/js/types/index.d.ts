import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface Filters {
  search?: string;
  status?: string;
  role?: string;
  sort?: string;
}
export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    systemStats?: SystemStats;
    filters?: Filters; 
    recentActivity?: ActivityItem[];
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: string[];
    permissions: string[];
    [key: string]: unknown; // This allows for additional properties...
}

export interface SystemStats {
    totalUsers: number;
    students: number;
    faculty: number;
    activeConsultations: number;
    completedToday: number;
    pendingRequests: number;
    systemUptime: number;
    monthlyGrowth: number;
}

export interface ActivityItem {
    id: number;
    action: string;
    user: string;
    time: string;
    type: string;
}

export interface Paginated<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface ConsultationAreas {
    id: number;
    building: string;
    room: string;
    created_at: string;
    updated_at: string;
}

export interface Faculty {
    id: number;
    name: string;
    [key: string]: unknown;
}

export interface Area {
    id: number;
    building: string;
    room: string;
    [key: string]: unknown;
}

export type Consultation = {
    id: number;
    faculty_name: string;
    student_name: string;
    area: {
        building: string;
        room: string;
    };
    duration: number;
    date: string;
    start_time: string;
    reason: string;
    status: 'pending' | 'approved' | 'declined';
    student_id?: number;
    faculty_id?: number;
    created_at: string;
    updated_at: string;
};

import { usePage } from "@inertiajs/react";

type User = {
    permissions: string[];
    roles: string[];
};

type Auth = {
    user: User;
};

export default function useCan() {
    const { auth } = usePage().props as unknown as { auth: Auth };

    const can = (permission: string): boolean => {
        return (auth?.user?.permissions || []).includes(permission);
    };

    const hasRole = (role: string): boolean => {
        return (auth?.user?.roles || []).includes(role);
    };

    return { can, hasRole };
}

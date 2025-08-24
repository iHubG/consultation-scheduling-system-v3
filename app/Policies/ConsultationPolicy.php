<?php

namespace App\Policies;

use App\Models\Consultation;
use App\Models\User;

class ConsultationPolicy
{
    /**
     * Allow all authenticated users to view their consultations.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Allow a user to view their own consultation, or if they're the faculty/admin.
     */
    public function view(User $user, Consultation $consultation): bool
    {
        return $user->id === $consultation->student_id ||
               $user->id === $consultation->faculty_id ||
               $user->hasRole('admin');
    }

    /**
     * Only students can create consultation requests.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('student');
    }

    /**
     * Allow faculty or admin to update consultations they own.
     */
    public function update(User $user, Consultation $consultation): bool
    {
        return $user->id === $consultation->faculty_id ||
               $user->hasRole('admin');
    }

    /**
     * Allow faculty or admin to delete consultations they own.
     */
    public function delete(User $user, Consultation $consultation): bool
    {
        return $user->id === $consultation->faculty_id ||
               $user->hasRole('admin');
    }

    /**
     * Restore: only admin (if you need it).
     */
    public function restore(User $user, Consultation $consultation): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Permanently delete: only admin.
     */
    public function forceDelete(User $user, Consultation $consultation): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Custom: Allow faculty or admin to approve consultations.
     */
    public function approve(User $user, Consultation $consultation): bool
    {
        return $user->id === $consultation->faculty_id ||
               $user->hasRole('admin');
    }
}

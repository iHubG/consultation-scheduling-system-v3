<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

class ConsultationApproved extends Notification
{
    public $faculty;

    public function __construct($faculty)
    {
        $this->faculty = $faculty;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'title' => 'Consultation approved',
            'description' => $this->faculty->name . ' approved your request',
            'link' => '/student/appointments',
        ];
    }
}

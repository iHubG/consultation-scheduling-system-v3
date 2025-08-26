<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

class ConsultationRequest extends Notification
{
    public $student;

    public function __construct($student)
    {
        $this->student = $student;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        return [
            'title' => 'New consultation request',
            'description' => 'From: ' . $this->student->name,
            'link' => '/faculty/requests', 
        ];
    }
}

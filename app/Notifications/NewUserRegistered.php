<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;

class NewUserRegistered extends Notification
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
            'title' => 'New user registered',
            'description' => 'Student: ' . $this->student->name,
            'link' => '/users',
        ];
    }
}


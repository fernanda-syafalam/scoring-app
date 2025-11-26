<?php

namespace App\Events;

use App\Events\Data\DropVerificationData;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DropVerification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public DropVerificationData $data;

    public function __construct(array $message)
    {
        $this->data = new DropVerificationData($message);
    }

    public function broadcastOn(): PresenceChannel
    {
        return new PresenceChannel('presence.dropVerification.' . $this->data->gelanggangId);
    }

    public function broadcastAs(): string
    {
        return 'dropVerification.' . $this->data->gelanggangId;
    }

    public function broadcastWith(): array
    {
        return $this->data->toArray();
    }
}

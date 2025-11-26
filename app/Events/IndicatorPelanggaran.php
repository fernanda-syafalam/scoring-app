<?php

namespace App\Events;

use App\Models\UserGelanggang;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class IndicatorPelanggaran implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private string $color, $penalty;
    private $roomId;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message)
    {
        $user = auth()->user();
        $gelanggang = $this->getGelanggangId($user);
        $this->roomId = $gelanggang;
        $this->color = $message['color'];
        $this->penalty = $message['penalty'];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn(): PresenceChannel
    {
        return new PresenceChannel('presence.penalty.' . $this->roomId);
    }

    public function broadcastAs(): string
    {
        return 'penalty.' . $this->roomId;
    }

    public function broadcastWith()
    {
        return [
            'color' => $this->color,
            'penalty' => $this->penalty
        ];
    }

    private function getRoleById($id): string
    {
        $roleMap = [
            5 => 'Juri Pertama',
            6 => 'Juri Kedua',
            7 => 'Juri Ketiga',
        ];

        return $roleMap[$id] ?? 'Role Lainnya';
    }

    private function getGelanggangId($user)
    {
        $gelanggang = UserGelanggang::where('user_id', $user->id)->first();
        if (!$gelanggang) {
            throw new \Exception("User does not have a gelanggang assignment.");
        }

        return $gelanggang->gelanggang_id;
    }
}

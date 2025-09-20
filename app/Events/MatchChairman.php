<?php

namespace App\Events;

use App\Models\Gelanggang;
use App\Models\User;
use App\Models\UserGelanggang;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MatchChairman implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private string $corner, $scorePiece;
    private int $roomId, $id;
    // private array $;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($message)
    {
        $user = auth()->user();
        $arena = $this->getArenaId($user);
        $this->roomId = $arena;
        $this->id = $user['role_id'];
        $this->corner = $message['corner'];
        $this->scorePiece = $message['scorePiece'];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('presence.match-chairman.'.$this->roomId);
    }

    public function broadcastAs(): string
    {
        return 'match-chairman.'.$this->roomId;
    }

    public function broadcastWith()
    {
        return [
            'corner'=>$this->corner,
            'scorePiece'=>$this->scorePiece,
            'id'=> $this->getRoleById($this->id)
        ];
    }
    private function getRoleById($id): string
    {
        $roleMap = [
            5 => 'Jury 1',
            6 => 'Jury 2',
            7 => 'Jury 3',
        ];

        return $roleMap[$id] ?? 'Other Role';
    }

    private function getArenaId($user)
    {
        $arena = UserArena::where('user_id', $user->id)->first();
        return $arena->arena_id;
    }

}
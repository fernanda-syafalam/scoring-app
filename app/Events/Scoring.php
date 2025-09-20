<?php

namespace App\Events;

use App\Models\UserArena;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Scoring implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private bool $done = false;
    private string $corner, $movement, $name;
    private int $blueScore, $redScore, $roomId, $id,$time;
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
        $this->movement = $message['movement'];
        $this->blueScore = $message['blueScore'];
        $this->redScore = $message['redScore'];
        $this->time = $message['time'];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('presence.jury.'.$this->roomId);
    }

    public function broadcastAs(): string
    {
        return 'jury.'.$this->roomId;
    }

    public function broadcastWith()
    {
        return [
            'blue_score'=>$this->blueScore,
            'red_score'=>$this->redScore,
            'expired'=>$this->time,
            'corner'=>$this->corner,
            'movement'=>$this->movement,
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

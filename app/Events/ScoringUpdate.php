<?php

namespace App\Events;

use App\Models\UserArena;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ScoringUpdate implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private int $blueScore, $redScore, $roomId, $droppingRed, $droppingBlue;
    private array $redPenalty, $bluePenalty;
    /**
     * @param mixed $message
     */
    public function __construct( $message)
    {
        $user = auth()->user();
        $arena = $this->getArenaId($user);
        $this->blueScore = $message['blueScore'];
        $this->redScore = $message['redScore'];
        $this->redPenalty = $message['redPenalty'];
        $this->bluePenalty = $message['bluePenalty'];
        $this->droppingRed = $message['droppingRed'];
        $this->droppingBlue = $message['droppingBlue'];
        $this->roomId = $arena;
    }
    public function broadcastOn(): PresenceChannel
    {
        return new PresenceChannel('presence.updateScore.'.$this->roomId);
    }

    public function broadcastAs(): string
    {
        return 'updateScore.'.$this->roomId;
    }
    public function broadcastWith()
    {
        return [
            'blue_score'=>$this->blueScore,
            'red_score'=>$this->redScore,
            'blue_penalty'=>$this->bluePenalty,
            'red_penalty'=>$this->redPenalty,
            'droppingRed'=>$this->droppingRed,
            'droppingBlue'=>$this->droppingBlue,
        ];
    }
    private function getArenaId($user)
    {
        $arena = UserArena::where('user_id', $user->id)->first();
        return $arena->arena_id;
    }
}

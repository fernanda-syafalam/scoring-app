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

class Scoring implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    private bool $done = false;
    private string $sudut, $gerakan, $name;
    private int $blueScore, $redScore, $roomId, $id,$time;
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
        $this->id = $user['role_id'];
        $this->sudut = $message['sudut'];
        $this->gerakan = $message['gerakan'];
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
        return new PresenceChannel('presence.juri.'.$this->roomId);
    }

    public function broadcastAs(): string
    {
        return 'juri.'.$this->roomId;
    }

    public function broadcastWith()
    {
        return [
            'blue_score'=>$this->blueScore,
            'red_score'=>$this->redScore,
            'expired'=>$this->time,
            'sudut'=>$this->sudut,
            'gerakan'=>$this->gerakan,
            'id'=> $this->getRoleById($this->id)
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

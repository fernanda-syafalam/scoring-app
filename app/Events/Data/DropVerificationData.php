<?php

namespace App\Events\Data;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

class DropVerificationData
{
    public string $juriPertama;
    public string $juriKedua;
    public string $juriKetiga;
    public bool $redPopup;
    public bool $bluePopup;
    public int $gelanggangId;
    public string $role;

    public function __construct(array $message)
    {
        $this->juriPertama = $message['juriPertama'] ?? '';
        $this->juriKedua = $message['juriKedua'] ?? '';
        $this->juriKetiga = $message['juriKetiga'] ?? '';
        $this->redPopup = $message['redPopup'] ?? false;
        $this->bluePopup = $message['bluePopup'] ?? false;
        
        $user = Auth::user();
        if (!$user) {
            throw new \Exception("User not authenticated.");
        }

        $this->gelanggangId = $this->getGelanggangId($user);
        $this->role = $this->getRoleById($user->role_id);
    }

    private function getGelanggangId(User $user): int
    {
        $userGelanggang = $user->userGelanggang;
        if (!$userGelanggang) {
            throw new \Exception("User does not have a gelanggang assignment.");
        }
        return $userGelanggang->gelanggang_id;
    }

    private function getRoleById(int $id): string
    {
        $roleMap = [
            5 => 'Juri Pertama',
            6 => 'Juri Kedua',
            7 => 'Juri Ketiga',
        ];

        return $roleMap[$id] ?? 'Role Lainnya';
    }

    public function toArray(): array
    {
        return [
            'message' => 'choice drop verification',
            'juri_pertama' => $this->juriPertama,
            'juri_kedua' => $this->juriKedua,
            'juri_ketiga' => $this->juriKetiga,
            'red_popup' => $this->redPopup,
            'blue_popup' => $this->bluePopup,
            'id' => $this->role,
        ];
    }
}

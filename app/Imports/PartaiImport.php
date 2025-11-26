<?php

namespace App\Imports;

use App\Models\Gelanggang;
use App\Models\Partai;
use App\Models\Pertandingan;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;

class PartaiImport implements ToCollection
{

    private $message;

    public function __construct()
    {
        $this->message = '';
    }

    public function getMessage()
    {
        return $this->message;
    }
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        $allkelas = config('app_settings.kelas'); // Use config instead of hardcoded
        $errorKelas = [];
        $firstIteration = true;
        $data = [];

        foreach ($collection as $row){
            if ($firstIteration) {
                $firstIteration = false;
                continue;
            }

            $kelas = strtoupper($row[6]);

            // FIX: Use in_array instead of array_search to avoid 0 index bug
            if (!in_array($kelas, $allkelas)){
                $errorKelas[] = intval($row[0]);
            }

            if (!$row[1]){
                continue;
            }

            $data[] = [
                'id' => intval($row[0]),
                'babak' => $row[1],
                'sudut_merah' => $row[2],
                'sudut_biru' => $row[3],
                'contingen_sudut_merah' => $row[4],
                'contingen_sudut_biru' => $row[5],
                'kelas' => $kelas,
                'jenis_kelamin' => strtolower($row[7]),
            ];
        }

        // Check for existing IDs
        $existingIds = Partai::whereIn('id', array_column($data, 'id'))->pluck('id')->toArray();

        if (count($errorKelas) > 0) {
            $errorIdsString = implode(', ', $errorKelas);
            $this->message = "Data dengan ID: $errorIdsString memiliki Kelas tidak valid!";
            return;
        }

        if (count($existingIds) > 0) {
            $existingIdsString = implode(', ', $existingIds);
            $this->message = "Data dengan ID: $existingIdsString sudah ada!";
            return;
        }

        // Use transaction for bulk insert
        DB::transaction(function () use ($data) {
            // Use bulk insert for better performance
            Partai::insert($data);

            // Reset sequence to prevent duplicate key errors on next insert
            DB::statement("SELECT setval(pg_get_serial_sequence('partais', 'id'), COALESCE(MAX(id), 1)) FROM partais;");
        });
    }
}

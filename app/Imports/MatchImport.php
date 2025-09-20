<?php

namespace App\Imports;

use App\Models\Match;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class MatchImport implements ToCollection
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
        $allClasses =['A','B','C','D','F','G','H','I','J'];
        $classErrors=[];
        $firstIteration = true;
        $data = [];
        foreach ($collection as $row){
            if ($firstIteration) {
                $firstIteration = false;
                continue;
            }
            $class = strtoupper($row[6]);
            if (!in_array($class, $allClasses)){
                $classErrors[]=intval($row[0]);
            }
            if (!$row[1]){
                continue;
            }
            $data[] = [
                'id' => intval($row[0]),
                'round' => $row[1],
                'red_corner' => $row[2],
                'blue_corner' => $row[3],
                'red_corner_contingent' => $row[4],
                'blue_corner_contingent' => $row[5],
                'class' => $class,
                'gender' => strtolower($row[7]),
            ];
        }
        $existingIds = Match::whereIn('id', array_column($data, 'id'))->pluck('id')->toArray();
        if (count($existingIds) > 0) {
            $existingIdsString = implode(', ', $existingIds);
            $this->message = "Data with IDs: $existingIdsString already exists and was not imported !";
            if(count($classErrors)>0){
                $existingIdsString = implode(', ', $classErrors);
                $this->message = "Data with IDs: $existingIdsString Class Not Found !";
            }
        } else {
            foreach ($data as $row) {
                Match::create([
                    'id' => $row['id'],
                    'round' => $row['round'],
                    'red_corner' => $row['red_corner'],
                    'blue_corner' => $row['blue_corner'],
                    'red_corner_contingent' => $row['red_corner_contingent'],
                    'blue_corner_contingent' => $row['blue_corner_contingent'],
                    'class' => $row['class'],
                    'gender' => $row['gender'],
                ]);
            }
        }
    }
}

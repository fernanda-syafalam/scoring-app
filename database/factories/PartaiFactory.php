<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PartaiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            // Let database auto-increment the ID
            'babak' => $this->faker->randomElement(['Semi-final','Final','Penyisihan','Seperempat']),
            'sudut_merah' => $this->faker->name(),
            'sudut_biru' => $this->faker->name(),
            'contingen_sudut_merah' => $this->faker->city(),
            'contingen_sudut_biru' => $this->faker->city(),
            'kelas' => $this->faker->randomElement(['A','B','C','D','E','F']),
            'jenis_kelamin' => $this->faker->randomElement(['laki-laki','perempuan'])
        ];
    }
}

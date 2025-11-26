<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partais', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('babak');
            $table->foreignId('gelanggang_id')->nullable();
            $table->string('sudut_merah');
            $table->string('sudut_biru');
            $table->string('contingen_sudut_merah');
            $table->string('contingen_sudut_biru');
            $table->string('kelas');
            $table->string('jenis_kelamin');
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partais');
    }
}

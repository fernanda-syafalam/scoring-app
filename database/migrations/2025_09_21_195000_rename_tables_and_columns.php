<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameTablesAndColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('gelanggangs', 'arenas');
        Schema::rename('partais', 'matches');
        Schema::rename('user_gelanggangs', 'user_arenas');

        Schema::table('arenas', function (Blueprint $table) {
            $table->renameColumn('nama_gelanggang', 'name');
        });

        Schema::table('matches', function (Blueprint $table) {
            $table->renameColumn('babak', 'round');
            $table->renameColumn('sudut_biru', 'blue_corner');
            $table->renameColumn('sudut_merah', 'red_corner');
            $table->renameColumn('contingen_sudut_biru', 'blue_corner_contingent');
            $table->renameColumn('contingen_sudut_merah', 'red_corner_contingent');
            $table->renameColumn('kelas', 'class');
            $table->renameColumn('jenis_kelamin', 'gender');
        });

        Schema::table('user_arenas', function (Blueprint $table) {
            $table->renameColumn('gelanggang_id', 'arena_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_arenas', function (Blueprint $table) {
            $table->renameColumn('arena_id', 'gelanggang_id');
        });

        Schema::table('matches', function (Blueprint $table) {
            $table->renameColumn('round', 'babak');
            $table->renameColumn('blue_corner', 'sudut_biru');
            $table->renameColumn('red_corner', 'sudut_merah');
            $table->renameColumn('blue_corner_contingent', 'contingen_sudut_biru');
            $table->renameColumn('red_corner_contingent', 'contingen_sudut_merah');
            $table->renameColumn('class', 'kelas');
            $table->renameColumn('gender', 'jenis_kelamin');
        });

        Schema::table('arenas', function (Blueprint $table) {
            $table->renameColumn('name', 'nama_gelanggang');
        });

        Schema::rename('arenas', 'gelanggangs');
        Schema::rename('matches', 'partais');
        Schema::rename('user_arenas', 'user_gelanggangs');
    }
}

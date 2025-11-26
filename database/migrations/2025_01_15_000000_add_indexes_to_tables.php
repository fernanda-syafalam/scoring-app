<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIndexesToTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Add indexes to users table
        Schema::table('users', function (Blueprint $table) {
            $table->index('gelanggang_id');
            $table->index('role_id');
            $table->index('username');
            $table->index('active');
        });

        // Add indexes to partais table
        Schema::table('partais', function (Blueprint $table) {
            $table->index('gelanggang_id');
            $table->index('status');
            $table->index('babak');
            $table->index('kelas');
        });

        // Add indexes to users_gelanggangs table
        Schema::table('users_gelanggangs', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('gelanggang_id');
            // Add composite index for common queries
            $table->index(['gelanggang_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['gelanggang_id']);
            $table->dropIndex(['role_id']);
            $table->dropIndex(['username']);
            $table->dropIndex(['active']);
        });

        Schema::table('partais', function (Blueprint $table) {
            $table->dropIndex(['gelanggang_id']);
            $table->dropIndex(['status']);
            $table->dropIndex(['babak']);
            $table->dropIndex(['kelas']);
        });

        Schema::table('users_gelanggangs', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['gelanggang_id']);
            $table->dropIndex(['gelanggang_id', 'user_id']);
        });
    }
}

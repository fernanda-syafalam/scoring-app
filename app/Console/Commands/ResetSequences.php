<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ResetSequences extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:reset-sequences';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset PostgreSQL sequences to match current max IDs (fixes duplicate key errors after imports)';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $tables = ['partais', 'users', 'gelanggangs', 'roles', 'log_pertandingan', 'users_gelanggangs'];

        $this->info('Resetting PostgreSQL sequences...');

        foreach ($tables as $table) {
            try {
                DB::statement("SELECT setval(pg_get_serial_sequence('$table', 'id'), COALESCE(MAX(id), 1)) FROM $table;");
                $this->line("✓ Reset sequence for table: $table");
            } catch (\Exception $e) {
                $this->warn("⚠ Could not reset sequence for table: $table");
                $this->line("  Error: " . $e->getMessage());
            }
        }

        $this->newLine();
        $this->info('Sequences reset successfully!');

        return 0;
    }
}

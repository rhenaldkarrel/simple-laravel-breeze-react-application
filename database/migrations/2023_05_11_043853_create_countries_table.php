<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('code', 3);
            $table->string('continent', 50);
            $table->timestamps();
        });

        $faker = Faker::create();

        for ($i = 1; $i <= 50; $i++) {
            DB::table('countries')->insert([
                'name' => $faker->country,
                'code' => $faker->countryCode,
                'continent' => $faker->randomElement(['AS', 'EU', 'AF']),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};

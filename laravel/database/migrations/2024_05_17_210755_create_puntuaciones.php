<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('puntuaciones', function (Blueprint $table) {
            $table->id();
            $table->integer('puntuacion');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->foreignId('juego_id')->references('id')->on('juegoss');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('puntuaciones');
    }
};

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
        Schema::create('perfil_usuarios', function (Blueprint $table) {
            $table->id();
            $table->foreign('puntos_id')->references('id')->on('puntuaciones');
            $table->foreign('users_id')->references('id')->on('users');
            $table->foreign('nivel_id')->references('id')->on('niveles');
            $table->foreign('juego_id')->references('id')->on('juegos');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perfil_usuarios');
    }
};

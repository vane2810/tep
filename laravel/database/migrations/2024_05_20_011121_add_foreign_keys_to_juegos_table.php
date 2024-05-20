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
        Schema::table('juegos', function (Blueprint $table) {

            $table->foreign('puntos_id')->references('id')->on('puntuaciones')->onDelete('cascade');
            $table->foreign('nivel_id')->references('id')->on('niveles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('juegos', function (Blueprint $table) {
            $table->unsignedBigInteger('puntos_id');
            $table->unsignedBigInteger('nivel_id');
        });
    }
};

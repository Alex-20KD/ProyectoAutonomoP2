<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();

            // Relación con post
            $table->unsignedBigInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');

            // Relación con usuario
            $table->unsignedBigInteger('user_id')->nullable(); // permite comentarios anónimos o eliminados
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');

            $table->text('content'); // el comentario en sí
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};

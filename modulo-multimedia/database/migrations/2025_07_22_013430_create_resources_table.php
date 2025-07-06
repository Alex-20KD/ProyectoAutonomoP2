<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->id();

            // Relación con post
            $table->unsignedBigInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');

            // Relación con tipo_recurso (opcional, siguiente entidad)
            $table->unsignedBigInteger('resource_type_id')->nullable();

            // Datos del recurso
            $table->string('filename'); // nombre del archivo
            $table->string('filepath'); // ruta donde se almacena
            $table->string('mime_type'); // tipo MIME (image/png, video/mp4, etc.)
            $table->integer('size')->nullable(); // tamaño en bytes

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};

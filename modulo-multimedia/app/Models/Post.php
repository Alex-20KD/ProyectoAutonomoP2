<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // Para asignación masiva (fillable)
    protected $fillable = ['user_id', 'title', 'content', 'status'];

    // Relación con Usuario (asumiendo que tienes o tendrás el modelo User)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Si quieres luego agregar relación con recursos, comentarios, etiquetas, aquí iría
    public function resources()
{
    return $this->hasMany(Resource::class);
}

public function comments()
{
    return $this->hasMany(Comment::class);
}

public function tags()
{
    return $this->belongsToMany(Tag::class);
}

}

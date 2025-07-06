<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'user_id',
        'content',
    ];

    /**
     * Relación: Un comentario pertenece a un post.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Relación: Un comentario puede pertenecer a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

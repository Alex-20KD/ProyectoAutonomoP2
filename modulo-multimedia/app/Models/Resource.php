<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'resource_type_id',
        'filename',
        'filepath',
        'mime_type',
        'size',
    ];

    /**
     * Un recurso pertenece a un post.
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * (Opcional) Un recurso puede tener un tipo.
     */
    public function resourceType()
    {
        return $this->belongsTo(ResourceType::class);
    }

    public function type()
{
    return $this->belongsTo(ResourceType::class, 'resource_type_id');
}

}

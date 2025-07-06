<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResourceType extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    /**
     * Relación: Un tipo de recurso puede tener muchos recursos.
     */
    public function resources()
    {
        return $this->hasMany(Resource::class);
    }
}

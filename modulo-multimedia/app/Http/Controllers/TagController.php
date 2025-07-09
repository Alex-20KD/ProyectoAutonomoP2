<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    // Listar todos los tags
    public function index()
    {
        return response()->json(Tag::all());
    }

    // Crear un nuevo tag
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:tags,name',
        ]);

        $tag = Tag::create([
            'name' => $request->name,
        ]);

        return response()->json($tag, 201);
    }

    // Mostrar un solo tag
    public function show($id)
    {
        $tag = Tag::findOrFail($id);
        return response()->json($tag);
    }

    // Actualizar un tag
    public function update(Request $request, $id)
    {
        $tag = Tag::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:tags,name,' . $tag->id,
        ]);

        $tag->update([
            'name' => $request->name,
        ]);

        return response()->json($tag);
    }

    // Eliminar un tag
    public function destroy($id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();

        return response()->json(['message' => 'Etiqueta eliminada']);
    }
}

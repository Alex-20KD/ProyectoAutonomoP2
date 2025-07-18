<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    // Listar todas las etiquetas
    public function index()
    {
        return response()->json(Tag::all());
    }

    // Crear una nueva etiqueta
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:tags,name',
        ]);

        $tag = Tag::create($validated);

        return response()->json($tag, 201);
    }

    // Mostrar una etiqueta específica
    public function show(string $id)
    {
        $tag = Tag::find($id);

        if (!$tag) {
            return response()->json(['message' => 'Etiqueta no encontrada'], 404);
        }

        return response()->json($tag);
    }

    // Actualizar una etiqueta
    public function update(Request $request, string $id)
    {
        $tag = Tag::find($id);

        if (!$tag) {
            return response()->json(['message' => 'Etiqueta no encontrada'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|unique:tags,name,' . $id,
        ]);

        $tag->update($validated);

        return response()->json($tag);
    }

    // Eliminar una etiqueta
    public function destroy(string $id)
    {
        $tag = Tag::find($id);

        if (!$tag) {
            return response()->json(['message' => 'Etiqueta no encontrada'], 404);
        }

        $tag->delete();

        return response()->json(['message' => 'Etiqueta eliminada correctamente']);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    // Listar todos los recursos
    public function index()
    {
        return response()->json(Resource::all(), 200);
    }

    // Crear un nuevo recurso
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'resource_type_id' => 'nullable|exists:resource_types,id',
            'filename' => 'required|string|max:255',
            'filepath' => 'required|string',
            'mime_type' => 'required|string',
            'size' => 'nullable|integer',
        ]);

        $resource = Resource::create($request->all());
        return response()->json($resource, 201);
    }

    // Ver un recurso por ID
    public function show($id)
    {
        $resource = Resource::find($id);
        if (!$resource) {
            return response()->json(['message' => 'Recurso no encontrado'], 404);
        }
        return response()->json($resource);
    }

    // Actualizar un recurso existente
    public function update(Request $request, $id)
    {
        $resource = Resource::find($id);
        if (!$resource) {
            return response()->json(['message' => 'Recurso no encontrado'], 404);
        }

        $request->validate([
            'post_id' => 'sometimes|exists:posts,id',
            'resource_type_id' => 'nullable|exists:resource_types,id',
            'filename' => 'sometimes|string|max:255',
            'filepath' => 'sometimes|string',
            'mime_type' => 'sometimes|string',
            'size' => 'nullable|integer',
        ]);

        $resource->update($request->all());
        return response()->json($resource);
    }

    // Eliminar un recurso
    public function destroy($id)
    {
        $resource = Resource::find($id);
        if (!$resource) {
            return response()->json(['message' => 'Recurso no encontrado'], 404);
        }

        $resource->delete();
        return response()->json(['message' => 'Recurso eliminado correctamente']);
    }
}

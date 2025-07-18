<?php

namespace App\Http\Controllers;

use App\Models\ResourceType;
use Illuminate\Http\Request;

class ResourceTypeController extends Controller
{
    // Listar todos los tipos de recursos
    public function index()
    {
        return response()->json(ResourceType::all(), 200);
    }

    // Crear un nuevo tipo de recurso
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:resource_types,name',
            'description' => 'nullable|string',
        ]);

        $resourceType = ResourceType::create($validated);

        return response()->json($resourceType, 201);
    }

    // Mostrar un tipo de recurso específico
    public function show(string $id)
    {
        $resourceType = ResourceType::find($id);

        if (!$resourceType) {
            return response()->json(['message' => 'Tipo de recurso no encontrado'], 404);
        }

        return response()->json($resourceType);
    }

    // Actualizar un tipo de recurso
    public function update(Request $request, string $id)
    {
        $resourceType = ResourceType::find($id);

        if (!$resourceType) {
            return response()->json(['message' => 'Tipo de recurso no encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|unique:resource_types,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $resourceType->update($validated);

        return response()->json($resourceType);
    }

    // Eliminar un tipo de recurso
    public function destroy(string $id)
    {
        $resourceType = ResourceType::find($id);

        if (!$resourceType) {
            return response()->json(['message' => 'Tipo de recurso no encontrado'], 404);
        }

        $resourceType->delete();

        return response()->json(['message' => 'Tipo de recurso eliminado correctamente']);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Listar todos los comentarios
    public function index()
    {
        return response()->json(Comment::all(), 200);
    }

    // Crear un nuevo comentario
    public function store(Request $request)
    {
        $validated = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'nullable|exists:users,id',
            'content' => 'required|string',
        ]);

        $comment = Comment::create($validated);

        return response()->json($comment, 201);
    }

    // Mostrar un comentario por ID
    public function show(string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comentario no encontrado'], 404);
        }

        return response()->json($comment);
    }

    // Actualizar un comentario existente
    public function update(Request $request, string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comentario no encontrado'], 404);
        }

        $validated = $request->validate([
            'content' => 'sometimes|required|string',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $comment->update($validated);

        return response()->json($comment);
    }

    // Eliminar un comentario
    public function destroy(string $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comentario no encontrado'], 404);
        }

        $comment->delete();

        return response()->json(['message' => 'Comentario eliminado correctamente']);
    }
}

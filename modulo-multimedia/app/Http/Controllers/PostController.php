<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::with(['tags', 'resources', 'comments'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|string|in:draft,published',
            'tag_ids' => 'array', // opcional
        ]);

        $post = Post::create($validated);

        if ($request->has('tag_ids')) {
            $post->tags()->sync($request->input('tag_ids'));
        }

        return response()->json($post->load(['tags']), 201);
    }

    public function show(Post $post)
    {
        return $post->load(['tags', 'resources', 'comments']);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'user_id' => 'sometimes|integer',
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'status' => 'sometimes|string|in:draft,published',
            'tag_ids' => 'sometimes|array',
        ]);

        $post->update($validated);

        if ($request->has('tag_ids')) {
            $post->tags()->sync($request->input('tag_ids'));
        }

        return response()->json($post->load(['tags']));
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(['message' => 'Post eliminado']);
    }
}

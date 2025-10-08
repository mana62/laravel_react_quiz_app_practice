<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Choice;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function index() {
        $quizzes = Quiz::with('choices')->get();
        return response()->json($quizzes);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'choices' => 'required|array|min:2',
            'choices.*.text' => 'required|string',
            'choices.*.is_correct' => 'boolean',
        ]);

        $quiz = Quiz::create(['question' => $validated['question']]);

        foreach($validated['choices'] as $choice) {
            $quiz->choices()->create($choice);
        }
        return response()->json($quiz->load('choices'), 201);
    }

    public function update(Request $request, $id) {
        $quiz = Quiz::findOrFail($id);

        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'choices' => 'required|array|min:2',
            'choices.*.text' => 'required|string',
            'choices.*.is_correct' => 'boolean',
        ]);

        $quiz->update(['question' => $validated['question']]);
        $quiz->choices()->delete();
        foreach ($validated['choices'] as $choice) {
            $quiz->choices()->create($choice);
        }

        return response()->json($quiz->load('choices'));
    }

    public function destroy($id) {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();

        return response()->json(['message' => 'Quiz deleted']);
    }
}
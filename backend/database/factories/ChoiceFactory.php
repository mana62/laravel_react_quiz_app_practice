<?php

// database/factories/ChoiceFactory.php
namespace Database\Factories;

use App\Models\Choice;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Quiz;

class ChoiceFactory extends Factory
{
    protected $model = Choice::class;

    public function definition()
    {
        return [
            'quiz_id' => Quiz::factory(),
            'text' => $this->faker->word,
            'is_correct' => $this->faker->boolean(25), // 25%の確率で正解
        ];
    }
}

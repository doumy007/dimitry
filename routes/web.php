<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/projects', [PageController::class, 'projects'])->name('projects');
Route::get('/news', [PageController::class, 'news'])->name('news');
Route::get('/news/{article:slug}', [PageController::class, 'newsShow'])->name('news.show');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

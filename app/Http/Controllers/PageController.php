<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Project;
use App\Models\User;

class PageController extends Controller
{
    public function home()
    {
        $user = User::first();
        $projects = Project::orderBy('sort_order')->get();

        return view('pages.home', compact('user', 'projects'));
    }

    public function projects()
    {
        return view('pages.projects');
    }

    public function news()
    {
        return view('pages.news');
    }

    public function newsShow(Article $article)
    {
        abort_if(!$article->is_published, 404);

        return view('pages.news-show', compact('article'));
    }

    public function contact()
    {
        return view('pages.contact');
    }
}

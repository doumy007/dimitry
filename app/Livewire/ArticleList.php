<?php

namespace App\Livewire;

use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Livewire\Component;
use Livewire\WithPagination;

class ArticleList extends Component
{
    use WithPagination;

    public string $search = '';
    public string $categoryId = '';
    public string $tagId = '';

    public function updatingSearch()
    {
        $this->resetPage();
    }

    public function updatingCategoryId()
    {
        $this->resetPage();
    }

    public function updatingTagId()
    {
        $this->resetPage();
    }

    public function render()
    {
        $articles = Article::query()
            ->published()
            ->when($this->search, function ($query) {
                $query->where(function ($q) {
                    $q->where('title', 'like', "%{$this->search}%")
                      ->orWhere('excerpt', 'like', "%{$this->search}%");
                });
            })
            ->when($this->categoryId, function ($query) {
                $query->where('category_id', $this->categoryId);
            })
            ->when($this->tagId, function ($query) {
                $query->whereHas('tags', fn($q) => $q->where('tags.id', $this->tagId));
            })
            ->orderBy('published_at', 'desc')
            ->paginate(9);

        return view('livewire.article-list', [
            'articles' => $articles,
            'categories' => Category::all(),
            'tags' => Tag::all(),
        ]);
    }
}

@extends('layouts.app')

@section('title', $article->title . ' — Dimitry Jacques')

@section('content')
<article class="section article-single">
    <div class="container container--narrow">
        <div class="article-header">
            <div class="article-meta">
                @if($article->category)
                    <span class="tech-badge">{{ $article->category->name }}</span>
                @endif
                <time datetime="{{ $article->published_at->format('Y-m-d') }}">
                    {{ $article->published_at->format('d M, Y') }}
                </time>
            </div>
            <h1 class="article-title">{{ $article->title }}</h1>
            @if($article->excerpt)
                <p class="article-excerpt">{{ $article->excerpt }}</p>
            @endif
            <div class="article-tags">
                @foreach($article->tags as $tag)
                    <span class="tech-badge">{{ $tag->name }}</span>
                @endforeach
            </div>
        </div>

        @if($article->featured_image)
            <div class="article-image">
                <img src="{{ asset('storage/' . $article->featured_image) }}" alt="{{ $article->title }}">
            </div>
        @endif

        <div class="article-body prose">
            {!! Str::markdown($article->body) !!}
        </div>

        <div class="article-nav">
            <a href="{{ route('news') }}" class="btn btn-outline">&larr; Volver a noticias</a>
        </div>
    </div>
</article>
@endsection

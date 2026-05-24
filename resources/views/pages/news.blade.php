@extends('layouts.app')

@section('title', 'Noticias — Dimitry Jacques')

@section('content')
<section class="section page-header">
    <div class="container">
        <h1 class="page-title">Noticias</h1>
        <p class="page-desc">Artículos sobre IA, RAG, automatización y tecnología.</p>
    </div>
</section>

<section class="section">
    <div class="container">
        @livewire('article-list')
    </div>
</section>
@endsection

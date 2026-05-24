@extends('layouts.app')

@section('title', 'Proyectos — Dimitry Jacques')

@section('content')
<section class="section page-header">
    <div class="container">
        <h1 class="page-title">Proyectos</h1>
        <p class="page-desc">Soluciones que he construido en IA, RAG, automatización y desarrollo web.</p>
    </div>
</section>

<section class="section">
    <div class="container">
        @livewire('project-filter')
    </div>
</section>
@endsection

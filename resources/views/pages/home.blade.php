@extends('layouts.app')

@section('title', 'Dimitry Jacques — IT Manager & Developer')

@section('content')
    {{-- Hero --}}
    <section class="hero" id="hero">
        <div class="hero-content">
            <div class="hero-badge">IT Manager & Developer</div>
            <h1 class="hero-title">
                <span class="greeting">Hola, soy</span>
                <span class="name">Dimitry Jacques</span>
            </h1>
            <div class="hero-typing">
                <span class="typing-text" id="typingText"></span>
                <span class="typing-cursor">|</span>
            </div>
            <p class="hero-subtitle">
                Java, C, PHP, Python, Angular, JavaScript — IA · RAG · Automatización
            </p>
            <div class="hero-actions">
                <a href="{{ route('projects') }}" class="btn btn-primary">Ver Proyectos</a>
                <a href="{{ route('contact') }}" class="btn btn-outline">Contactar</a>
            </div>
            <div class="hero-social">
                <a href="https://github.com/doumy007" target="_blank" rel="noopener" class="social-icon" title="GitHub">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>
                </a>
                <a href="https://linkedin.com/in/dimitryjacques" target="_blank" rel="noopener" class="social-icon" title="LinkedIn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
            </div>
        </div>
        <div class="hero-scroll">
            <span>Scroll</span>
            <div class="scroll-line"></div>
        </div>
    </section>

    {{-- About --}}
    <section class="section about" id="about">
        <div class="container">
            <h2 class="section-title">Sobre Mí</h2>
            <div class="about-grid">
                <div class="about-image">
                    <div class="about-photo-frame">
                        <div class="about-photo-placeholder">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span>Tu foto aquí</span>
                        </div>
                    </div>
                </div>
                <div class="about-content">
                    <p class="about-text">
                        Apasionado por la tecnología con más de 10 años liderando equipos TI y desarrollando soluciones 
                        de software. Mi expertise abarca desde sistemas de baja latencia en <strong>C y Java</strong> 
                        hasta aplicaciones web modernas con <strong>Angular y Laravel</strong>.
                    </p>
                    <p class="about-text">
                        Hoy me enfoco en <strong>Inteligencia Artificial, RAG y Automatización</strong>, 
                        transformando procesos empresariales con tecnología de punta.
                    </p>
                    <div class="about-stats">
                        <div class="stat">
                            <span class="stat-number">10+</span>
                            <span class="stat-label">Años TI</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">30+</span>
                            <span class="stat-label">Proyectos</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">6</span>
                            <span class="stat-label">Lenguajes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {{-- Skills --}}
    <section class="section skills" id="skills">
        <div class="container">
            <h2 class="section-title">Habilidades</h2>
            <div class="skills-grid">
                <div class="skill-card" data-tech="Java">
                    <div class="skill-icon"><span class="skill-emoji">☕</span></div>
                    <h3 class="skill-name">Java</h3>
                    <p class="skill-desc">Spring Boot, Microservicios, APIs REST</p>
                </div>
                <div class="skill-card" data-tech="C">
                    <div class="skill-icon"><span class="skill-emoji">⚙️</span></div>
                    <h3 class="skill-name">C / C++</h3>
                    <p class="skill-desc">Sistemas embebidos, alto rendimiento</p>
                </div>
                <div class="skill-card" data-tech="PHP">
                    <div class="skill-icon"><span class="skill-emoji">🐘</span></div>
                    <h3 class="skill-name">PHP / Laravel</h3>
                    <p class="skill-desc">Web apps, APIs, Filament, Livewire</p>
                </div>
                <div class="skill-card" data-tech="Python">
                    <div class="skill-icon"><span class="skill-emoji">🐍</span></div>
                    <h3 class="skill-name">Python</h3>
                    <p class="skill-desc">IA, RAG, Automatización, Data Science</p>
                </div>
                <div class="skill-card" data-tech="Angular">
                    <div class="skill-icon"><span class="skill-emoji">🅰️</span></div>
                    <h3 class="skill-name">Angular</h3>
                    <p class="skill-desc">SPA, Componentes, RxJS, TypeScript</p>
                </div>
                <div class="skill-card" data-tech="JavaScript">
                    <div class="skill-icon"><span class="skill-emoji">📜</span></div>
                    <h3 class="skill-name">JavaScript</h3>
                    <p class="skill-desc">Node.js, React, Alpine.js, Three.js</p>
                </div>
            </div>
        </div>
    </section>

    {{-- Featured Projects --}}
    <section class="section featured-projects" id="featured">
        <div class="container">
            <h2 class="section-title">Proyectos Destacados</h2>
            <div class="projects-grid">
                @forelse($projects->take(3) as $project)
                <div class="project-card" data-tech="{{ implode(',', $project->tech_stack ?? []) }}">
                    <div class="project-card-image">
                        @if($project->image)
                            <img src="{{ asset('storage/' . $project->image) }}" alt="{{ $project->title }}">
                        @else
                            <div class="project-card-placeholder">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                            </div>
                        @endif
                    </div>
                    <div class="project-card-body">
                        <h3>{{ $project->title }}</h3>
                        <p>{{ Str::limit($project->description, 120) }}</p>
                        <div class="project-techs">
                            @foreach($project->tech_stack as $tech)
                                <span class="tech-badge">{{ $tech }}</span>
                            @endforeach
                        </div>
                        <div class="project-links">
                            @if($project->github_url)
                                <a href="{{ $project->github_url }}" target="_blank" rel="noopener" class="btn btn-sm">GitHub</a>
                            @endif
                            @if($project->demo_url)
                                <a href="{{ $project->demo_url }}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">Demo</a>
                            @endif
                        </div>
                    </div>
                </div>
                @empty
                <p class="text-center">Próximamente...</p>
                @endforelse
            </div>
            @if($projects->count() > 3)
            <div class="text-center mt-8">
                <a href="{{ route('projects') }}" class="btn btn-outline">Ver todos los proyectos</a>
            </div>
            @endif
        </div>
    </section>
@endsection

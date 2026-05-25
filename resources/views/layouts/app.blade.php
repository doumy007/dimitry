<!DOCTYPE html>
<html lang="es" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Dimitry Jacques - IT Manager & Developer. Especialista en IA, RAG, Automatización y Desarrollo de Software.">
    <meta property="og:title" content="Dimitry Jacques">
    <meta property="og:description" content="IT Manager & Developer">
    <meta property="og:type" content="website">
    <title>@yield('title', 'Dimitry Jacques') — IT Manager & Developer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    @livewireStyles
</head>
<body>
    <canvas id="particles-canvas"></canvas>
    <div class="custom-cursor" id="customCursor"></div>

    <nav class="navbar" id="navbar">
        <div class="nav-container">
            <a href="{{ route('home') }}" class="nav-logo">DIMITRY<span class="accent">.</span></a>
            <div class="nav-links" id="navLinks">
                <a href="{{ route('home') }}" class="nav-link">Inicio</a>
                <a href="{{ route('projects') }}" class="nav-link">Proyectos</a>
                <a href="{{ route('news') }}" class="nav-link">Noticias</a>
                <a href="{{ route('contact') }}" class="nav-link">Contacto</a>
            </div>
            <button class="nav-toggle" id="navToggle" aria-label="Menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <main>
        @yield('content')
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; {{ date('Y') }} Dimitry Jacques. Todos los derechos reservados.</p>
            <div class="footer-links">
                <a href="https://github.com/doumy007" target="_blank" rel="noopener" class="footer-link">GitHub</a>
                <a href="https://www.linkedin.com/in/dimitry-jacques-024470149" target="_blank" rel="noopener" class="footer-link">LinkedIn</a>
            </div>
        </div>
    </footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    @livewireScripts
</body>
</html>

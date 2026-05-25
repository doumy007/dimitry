<div>
    <div class="filter-bar">
        <button wire:click="$set('selectedTech', '')"
                class="filter-btn {{ empty($selectedTech) ? 'active' : '' }}">
            Todos
        </button>
        @foreach($allTechs as $tech)
        <button wire:key="tech-{{ $loop->index }}" wire:click="$set('selectedTech', {{ json_encode($tech) }})"
                class="filter-btn {{ $selectedTech === $tech ? 'active' : '' }}">
            {{ $tech }}
        </button>
        @endforeach
    </div>

    <div class="projects-grid">
        @forelse($projects as $project)
        <div wire:key="project-{{ $project->id }}" class="project-card" data-tech="{{ implode(',', $project->tech_stack ?? []) }}">
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
        <div class="empty-state">
            <p>No hay proyectos con ese filtro.</p>
        </div>
        @endforelse
    </div>
</div>

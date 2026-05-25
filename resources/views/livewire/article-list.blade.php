<div>
    <div class="news-filters">
        <div class="search-bar">
            <input type="text" wire:model.live="search" placeholder="Buscar artículos..." class="search-input">
        </div>
        <div class="filter-bar">
            <button wire:click="$set('categoryId', '')"
                    class="filter-btn {{ empty($categoryId) ? 'active' : '' }}">
                Todas
            </button>
            @foreach($categories as $category)
                <button wire:key="cat-{{ $category->id }}" wire:click="$set('categoryId', '{{ $category->id }}')"
                        class="filter-btn {{ $categoryId == $category->id ? 'active' : '' }}">
                    {{ $category->name }}
                </button>
            @endforeach
        </div>
        <div class="filter-tags">
            @foreach($tags as $tag)
                <button wire:key="tag-{{ $tag->id }}" wire:click="$set('tagId', '{{ $tag->id }}')"
                        class="tag-btn {{ $tagId == $tag->id ? 'active' : '' }}">
                    #{{ $tag->name }}
                </button>
            @endforeach
        </div>
    </div>

    <div class="news-grid">
        @forelse($articles as $article)
        <a wire:key="article-{{ $article->id }}" href="{{ route('news.show', $article) }}" class="news-card">
            @if($article->featured_image)
                <div class="news-card-image">
                    <img src="{{ asset('storage/' . $article->featured_image) }}" alt="{{ $article->title }}">
                </div>
            @endif
            <div class="news-card-body">
                <div class="news-card-meta">
                    @if($article->category)
                        <span class="tech-badge">{{ $article->category->name }}</span>
                    @endif
                    <time datetime="{{ $article->published_at->format('Y-m-d') }}">
                        {{ $article->published_at->format('d M, Y') }}
                    </time>
                </div>
                <h3>{{ $article->title }}</h3>
                @if($article->excerpt)
                    <p>{{ Str::limit($article->excerpt, 150) }}</p>
                @endif
                <div class="news-card-tags">
                    @foreach($article->tags as $tag)
                        <span class="tech-badge-small">#{{ $tag->name }}</span>
                    @endforeach
                </div>
            </div>
        </a>
        @empty
        <div class="empty-state">
            <p>No hay artículos aún.</p>
        </div>
        @endforelse
    </div>

    <div class="pagination">
        {{ $articles->links() }}
    </div>
</div>

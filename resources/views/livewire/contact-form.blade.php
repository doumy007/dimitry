<div class="form-container">
    @if($success)
        <div class="form-success">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <h3>¡Mensaje enviado!</h3>
            <p>Gracias por contactarme. Te responderé pronto.</p>
            <button wire:click="$set('success', false)" class="btn btn-outline">Enviar otro</button>
        </div>
    @else
        <form wire:submit="submit" class="form">
            <div class="form-group">
                <label for="name">Nombre</label>
                <input type="text" id="name" wire:model="name" class="form-input" placeholder="Tu nombre">
                @error('name') <span class="form-error">{{ $message }}</span> @enderror
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" wire:model="email" class="form-input" placeholder="tu@email.com">
                @error('email') <span class="form-error">{{ $message }}</span> @enderror
            </div>
            <div class="form-group">
                <label for="subject">Asunto</label>
                <input type="text" id="subject" wire:model="subject" class="form-input" placeholder="Opcional">
                @error('subject') <span class="form-error">{{ $message }}</span> @enderror
            </div>
            <div class="form-group">
                <label for="message">Mensaje</label>
                <textarea id="message" wire:model="message" class="form-input" rows="5" placeholder="Tu mensaje..."></textarea>
                @error('message') <span class="form-error">{{ $message }}</span> @enderror
            </div>
            <button type="submit" class="btn btn-primary btn-block">Enviar Mensaje</button>
        </form>
    @endif
</div>

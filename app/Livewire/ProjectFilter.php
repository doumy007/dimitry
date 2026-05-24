<?php

namespace App\Livewire;

use App\Models\Project;
use Livewire\Component;

class ProjectFilter extends Component
{
    public string $selectedTech = '';

    public function render()
    {
        $projects = Project::query()
            ->when($this->selectedTech, function ($query) {
                $query->whereJsonContains('tech_stack', $this->selectedTech);
            })
            ->orderBy('sort_order')
            ->get();

        $allTechs = Project::all()
            ->pluck('tech_stack')
            ->flatten()
            ->unique()
            ->sort()
            ->values();

        return view('livewire.project-filter', [
            'projects' => $projects,
            'allTechs' => $allTechs,
        ]);
    }
}

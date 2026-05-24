<?php

namespace App\Filament\Resources\Articles\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug'),
                Textarea::make('excerpt')
                    ->columnSpanFull(),
                RichEditor::make('body')
                    ->columnSpanFull(),
                FileUpload::make('featured_image')
                    ->image(),
                Select::make('category_id')
                    ->relationship('category', 'name'),
                Toggle::make('is_published'),
                DateTimePicker::make('published_at'),
                Select::make('tags')
                    ->multiple()
                    ->relationship('tags', 'name'),
            ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Category;
use App\Models\Project;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class InitialDataSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Dimitry Jacques',
            'email' => 'admin@dimitryjacques.com',
            'password' => bcrypt('admin123'),
            'job_title' => 'IT Manager & Developer',
            'bio' => 'Apasionado por la tecnología con expertise en Java, C, PHP, Python, Angular y JavaScript. Lidero equipos TI y desarrollo soluciones de IA, RAG y automatización.',
        ]);

        $catIA = Category::create(['name' => 'Inteligencia Artificial', 'slug' => 'inteligencia-artificial']);
        $catAuto = Category::create(['name' => 'Automatización', 'slug' => 'automatizacion']);
        $catDev = Category::create(['name' => 'Desarrollo', 'slug' => 'desarrollo']);

        $tagRAG = Tag::create(['name' => 'RAG', 'slug' => 'rag']);
        $tagAI = Tag::create(['name' => 'IA', 'slug' => 'ia']);
        $tagPython = Tag::create(['name' => 'Python', 'slug' => 'python']);
        $tagLaravel = Tag::create(['name' => 'Laravel', 'slug' => 'laravel']);
        $tagJava = Tag::create(['name' => 'Java', 'slug' => 'java']);

        Project::create([
            'title' => 'Sistema RAG para Documentación Técnica',
            'slug' => 'sistema-rag-documentacion',
            'description' => 'Sistema de Retrieval Augmented Generation que permite consultar documentación técnica usando lenguaje natural. Implementado con Python, LangChain y PostgreSQL.',
            'tech_stack' => ['Python', 'LangChain', 'PostgreSQL', 'OpenAI'],
            'github_url' => 'https://github.com/doumy007/rag-docs',
            'sort_order' => 1,
        ]);

        Project::create([
            'title' => 'Pipeline CI/CD Automatizado',
            'slug' => 'pipeline-cicd',
            'description' => 'Pipeline completo de integración y despliegue continuo con GitHub Actions, Docker y AWS. Automatización de tests, builds y deploys.',
            'tech_stack' => ['Docker', 'AWS', 'GitHub Actions', 'Bash'],
            'github_url' => 'https://github.com/doumy007/cicd-pipeline',
            'sort_order' => 2,
        ]);

        Project::create([
            'title' => 'Dashboard IA para Análisis de Datos',
            'slug' => 'dashboard-ia-analisis',
            'description' => 'Dashboard interactivo con Angular y Laravel que utiliza modelos de ML para predecir tendencias y analizar datos empresariales en tiempo real.',
            'tech_stack' => ['Angular', 'Laravel', 'Python', 'TensorFlow'],
            'demo_url' => 'https://demo.dimitryjacques.com/dashboard',
            'sort_order' => 3,
        ]);

        $article = Article::create([
            'title' => '¿Qué es RAG y por qué está revolucionando la IA?',
            'slug' => 'que-es-rag',
            'excerpt' => 'El Retrieval Augmented Generation combina búsqueda semántica con modelos de lenguaje para respuestas más precisas.',
            'body' => "## ¿Qué es RAG?\n\nRAG (Retrieval Augmented Generation) es una arquitectura que combina **sistemas de recuperación** con **modelos generativos** de lenguaje.\n\n### ¿Cómo funciona?\n\n1. El usuario hace una pregunta\n2. El sistema busca documentos relevantes en una base de datos vectorial\n3. El modelo de lenguaje genera una respuesta basada en esos documentos\n\n### Ventajas\n\n- Respuestas más precisas y actualizadas\n- Menos alucinaciones\n- Trazabilidad de fuentes",
            'category_id' => $catIA->id,
            'is_published' => true,
            'published_at' => now(),
        ]);
        $article->tags()->attach([$tagRAG->id, $tagAI->id, $tagPython->id]);
    }
}

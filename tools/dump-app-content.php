<?php
// Vuelca app_content (status=publish) a JSON EN EL SERVIDOR (sin túnel).
// Uso: wp eval-file ~/aeln_dump.php  -> escribe en ~/aeln-json/*.json
if (!defined('ABSPATH')) { fwrite(STDERR, "Run via wp eval-file\n"); exit(1); }
global $wpdb;

$rows = $wpdb->get_results("SELECT * FROM app_content WHERE status='publish' ORDER BY id", ARRAY_A);
$SITE = 'https://aulaenlanube.com';
$lessons = array(); $posts = array(); $landings = array(); $heads = array();

foreach ($rows as $r) {
    $heads[] = array(
        'path' => $r['path'],
        'title' => ($r['seo_title'] !== '' && $r['seo_title'] !== null) ? $r['seo_title'] : $r['title'],
        'description' => $r['seo_desc'] ?: '',
        'canonical' => $SITE . $r['path'],
    );
    if ($r['type'] === 'lesson') {
        $fam = implode('-', array_slice(explode('-', $r['slug']), 0, 2));
        $lessons[] = array(
            'id' => (int) $r['id'], 'slug' => $r['slug'], 'path' => $r['path'], 'title' => $r['title'],
            'videoId' => $r['video_id'] ?: '', 'videoUrl' => $r['video_id'] ? ('https://youtu.be/' . $r['video_id']) : '',
            'desc' => $r['body'] ?: '', 'parent' => (int) $r['parent_id'], 'menuOrder' => (int) $r['menu_order'],
            'date' => $r['published_at'] ?: '', 'family' => $fam, 'yoastTitle' => '',
            'yoastDesc' => $r['seo_desc'] ?: '', 'thumb' => $r['og_image'] ?: '',
        );
    } elseif ($r['type'] === 'post') {
        $posts[] = array(
            'id' => (int) $r['id'], 'slug' => $r['slug'], 'path' => $r['path'], 'title' => $r['title'],
            'date' => $r['published_at'] ?: '', 'modified' => $r['updated_at'] ?: '',
            'parent' => (int) $r['parent_id'], 'menuOrder' => (int) $r['menu_order'],
            'content' => $r['body'] ?: '', 'contentLen' => strlen($r['body'] ?: ''),
            'yoastTitle' => '', 'yoastDesc' => $r['seo_desc'] ?: '', 'thumb' => $r['og_image'] ?: '', 'categories' => array(),
        );
    } else {
        $landings[] = array(
            'id' => (int) $r['id'], 'slug' => $r['slug'], 'path' => $r['path'], 'title' => $r['title'],
            'date' => $r['published_at'] ?: '', 'parent' => (int) $r['parent_id'], 'menuOrder' => (int) $r['menu_order'],
            'content' => $r['body'] ?: '', 'contentLen' => strlen($r['body'] ?: ''),
            'elementorTexts' => array(), 'elementorHeadings' => array(), 'elementorImages' => array(),
            'elemLen' => 0, 'hasVideoWidget' => false,
            'yoastTitle' => '', 'yoastDesc' => $r['seo_desc'] ?: '', 'thumb' => $r['og_image'] ?: '',
        );
    }
}

$home = getenv('HOME'); if (!$home) { $home = getcwd(); }
$dir = $home . '/aeln-json';
if (!is_dir($dir)) mkdir($dir, 0755, true);
file_put_contents("$dir/lessons.json", wp_json_encode($lessons));
file_put_contents("$dir/posts.json", wp_json_encode($posts));
file_put_contents("$dir/landings.json", wp_json_encode($landings));
file_put_contents("$dir/head.json", wp_json_encode($heads));

$prods = $wpdb->get_results("SELECT id,name,url,image,description,cta,badge FROM app_products WHERE active=1 ORDER BY sort, id", ARRAY_A);
file_put_contents("$dir/products.json", wp_json_encode($prods ?: array()));

echo "dump: " . count($lessons) . " lecciones, " . count($posts) . " posts, " . count($landings) . " paginas, " . count($prods) . " productos\n";

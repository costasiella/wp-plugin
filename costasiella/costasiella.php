<?php
/**
 * Plugin Name: Costasiella
 */

function schedule_shortcode() {
	return '<div id="cs-schedule"></div>';
}

add_shortcode('costasiella-schedule', 'schedule_shortcode');

function schedule_load_assets() {
	
	$react_app_js  = plugin_dir_url( __FILE__ ) . 'schedule_app/build/static/js/all_in_one_file.js';
    $react_app_css = plugin_dir_url( __FILE__ ) . 'schedule_app/build/static/css/all_in_one_file.css';	
      
    // time stops stylesheet/js caching while in development, might want to remove later  
    $version = time();	
    wp_enqueue_script( 'costasiella', $react_app_js, array(), $version, true );         
    wp_enqueue_style( 'costasiella', $react_app_css, array(), $version );
}

add_action( 'wp_enqueue_scripts', 'schedule_load_assets' );

?>

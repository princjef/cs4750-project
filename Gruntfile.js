module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				stripBanners: true
			},
			dist: {
				src: ['app/js/main.js', 'app/js/**/*.js'],
				dest: 'app/js/app.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};
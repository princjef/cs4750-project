module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				stripBanners: true
			},
			dist: {
				src: ['app/js/main.js', 'app/js/**/*.js', '!app/js/app.js'],
				dest: 'app/js/app.js'
			}
		},
		watch: {
			scripts: {
				files: ['app/js/**/*.js', '!app/js/app.js'],
				tasks: ['concat', 'notify:concat'],
				options: {
					interrupt: true
				}
			}
		},
		notify: {
			concat: {
				options: {
					message: 'All client JavaScript files compiled.'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');
};
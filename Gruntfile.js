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
			},
			server: {
				files: ['server.js', 'routes/**/*.js', 'model/**/*.js'],
				tasks: ['shell:server', 'notify:server'],
				options: {
					interrupt: true
				}
			}
		},
		notify: {
			concat: {
				options: {
					message: 'All client JavaScript files compiled'
				}
			},
			compass: {
				options: {
					message: 'Compass is polling for changes'
				}
			},
			server: {
				options: {
					message: 'Server is running'
				}
			}
		},
		notify_hooks: {
			options: {
				enabled: false
			}
		},
		shell: {
			server: {
				command: 'node server.js',
				options: {
					async: true
				}
			},
			compass: {
				command: 'compass watch',
				options: {
					async: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-shell-spawn');

	grunt.task.run('notify_hooks');

	grunt.registerTask('default', ['shell:compass', 'notify:compass', 'shell:server', 'notify:server', 'watch']);
};
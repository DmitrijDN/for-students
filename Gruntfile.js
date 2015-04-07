module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		javascripts: ['frontend/javascripts/**/*.js'],
		server_js: ['backend/**/*.js'],
		templates: ['frontend/javascripts/**/*.jade'],
		views: ['frontend/views/**/*.jade'],
		stylesheets: ['frontend/styles/**/*.styl'],

		jshint: {
			client: ['Gruntfile.js', '<%= javascripts %>',
				'!frontend/javascripts/libs/**/*.js'
			],
			server: ['<%= server_js %>'],
			options: {
				sub: true,
				smarttabs: true,
				multistr: true,
				loopfunc: true
			}
		},

		watch: {
			options: {
				livereload: true
			},
			scripts: {
				files: ['<%= javascripts %>'],
				tasks: ['javascripts']
			},
			server_js: {
				files: ['<%= server_js %>'],
				tasks: ['jshint:server'],
				options: {
					livereload: false
				}
			},
			styles: {
				files: ['<%= stylesheets %>'],
				tasks: ['stylus']
			},
			jade_pages: {
				files: ['<%= views %>'],
				tasks: ['jade:pages']
			},
			jade_templates: {
				files: ['<%= templates %>'],
				tasks: ['jade:templates']
			}
		},

		jade: {
			templates: {
				files: [{
					expand: true,
					cwd: 'frontend/javascripts',
					src: ['**/*.jade'],
					dest: 'public/templates/',
					ext: '.html'
				}]
			},
			pages: {
				dest: 'public/_index.html',
				src: 'frontend/views/index.jade'
			}
		},

		stylus: {
			compile: {
				options: {
					'include css': true,
					'paths': ['frontend/styles/'],
					'compress': true
				},
				files: {
					'public/styles/style.css': ['<%= stylesheets %>']
				}
			}
		},

		open: {
			dev: {
				path: 'http://localhost:3050/'
			}
		},

		copy: {
			libs: {
				files: [{
					expand: false,
					src: ['node_modules/angular/angular.js'],
					dest: 'public/javascripts/libs/angular.js'
				}, {
					expand: false,
					src: ['node_modules/angular-route/angular-route.js'],
					dest: 'public/javascripts/libs/angular-route.js'
				}, {
					expand: false,
					src: ['node_modules/angular-resource/angular-resource.js'],
					dest: 'public/javascripts/libs/angular-resource.js'
				}, {
					expand: false,
					src: ['frontend/customLibs/jquery.inputmask.js'],
					dest: 'public/javascripts/libs/jquery.inputmask.js'
				}, {
					expand: false,
					src: ['frontend/customLibs/jquery.inputmask.date.min.js'],
					dest: 'public/javascripts/libs/jquery.inputmask.date.min.js'
				}, {
					expand: false,
					src: ['bower_components/jquery/dist/jquery.min.js'],
					dest: 'public/javascripts/libs/jquery.min.js'
				}, {
					expand: false,
					src: ['bower_components/jquery/dist/jquery.min.map'],
					dest: 'public/javascripts/libs/jquery.min.map'
				}, {
					expand: false,
					src: ['bower_components/jquery/dist/jquery.js'],
					dest: 'public/javascripts/libs/jquery.js'
				}, {
					expand: false,
					src: ['bower_components/bootstrap/dist/css/bootstrap.css'],
					dest: 'public/styles/bootstrap.css'
				}, {
					expand: false,
					src: ['bower_components/bootstrap/dist/css/bootstrap.css.map'],
					dest: 'public/styles/bootstrap.css.map'
				}, {
					expand: false,
					src: ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
					dest: 'public/javascripts/libs/bootstrap.min.js'
				}, {
					expand: false,
					src: ['bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf'],
					dest: 'public/javascripts/fonts/glyphicons-halflings-regular.ttf'
				}, {
					expand: false,
					src: ['bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff'],
					dest: 'public/javascripts/fonts/glyphicons-halflings-regular.woff'
				}, {
					expand: false,
					src: ['node_modules/fingerprint/lib/fingerprint.js'],
					dest: 'public/javascripts/fingerprint.js'
				}]
			},
			js: {
				files: [{
					expand: true,
					cwd: 'frontend/javascripts/',
					src: ['**'],
					dest: 'public/javascripts/'
				}]
			},
			resources: {
				files: [{
					expand: true,
					cwd: 'frontend/resources/',
					src: ['**'],
					dest: 'public/resources/'
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: 'frontend/images/',
					src: ['**'],
					dest: 'public/images/'
				}]
			}
		},

		clean: {
			public_js: {
				src: ['public/javascripts']
			}
		},

		browserify: {
			my: {
				dest: 'public/javascripts/main.js',
				src: 'frontend/javascripts/**/*.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('common', ['clean', 'jshint', 'jade', 'stylus', 'copy']);
	grunt.registerTask('javascripts', ['jshint', 'clean', 'copy', 'browserify']);
	grunt.registerTask('default', ['common', 'browserify']);
	grunt.registerTask('dev', ['common', 'browserify', 'watch', 'open']);
};
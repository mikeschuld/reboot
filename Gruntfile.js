module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				files: {
					'dist/css/rb-core.css': 'sass/rb-core.scss',
					'dist/css/rb-gridfree.css': 'sass/rb-gridfree.scss'
				}
			}
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'dist/css/normalize.min.css': ['node_modules/normalize.css/normalize.css'],
					'dist/css/rb-core.min.css': ['dist/css/rb-core.css'],
					'dist/css/rb-gridfree.min.css': ['dist/css/rb-gridfree.css']
				}
			}
		},

		uglify: {
			my_target: {
				files: {
					'dist/js/rb-gridfree.min.js': ['js/rb-gridfree.js']
				}
			}
		},

		copy: {
			js: {
				files:[
					{expand: true, flatten: true, src: ['js/*.js'], dest: 'dist/js'}
				]
			},
			docs: {
				files:[
					{expand: true, flatten: true, src: ['dist/css/*.css'], dest: 'docs/css'},
					{expand: true, flatten: true, src: ['dist/js/*.js'], dest: 'docs/js'}
				]
			}
		},

		watch: {
			css: {
				files: 'sass/*.scss',
				tasks: ['sass', 'cssmin', 'copy']
			},
			js: {
				files: 'js/*.js',
				tasks: ['uglify', 'copy']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
}
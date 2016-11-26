module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				files: {
					'css/rb-core.css': 'sass/rb-core.scss',
					'css/rb-gridfree.css': 'sass/rb-gridfree.scss'
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
					'css/normalize.min.css': ['node_modules/normalize.css/normalize.css'],
					'css/rb-core.min.css': ['css/rb-core.css'],
					'css/rb-gridfree.min.css': ['css/rb-gridfree.css']
				}
			}
		},

		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'cssmin']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['watch']);
}
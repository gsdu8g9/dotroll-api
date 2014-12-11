module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			dist: 'dist',
			asset: 'assets',
		},
		clean: {
			dist: '<%= path.dist %>',
		},
		copy: {
			html: {
				src: 'src/index.html',
				dest: 'dist/index.html',
			},
			raml: {
				src: 'src/api.raml',
				dest: 'dist/api.raml',
			},
			vendor: {
				files: [
					{
						expand: true,
						cwd: 'bower_components/api-console/dist/',
						src:['scripts/**', 'styles/**', 'fonts/**'],
						dest:'<%= path.dist %>/<%= path.asset %>/',
					},
				],
			},
		},
		humans_txt: {
			options: {
				intro: '<%= pkg.description %>',
				commentStyle: 'u',
				includeUpdateIn: 'site',
				content: grunt.file.readJSON('src/humans.json'),
			},
			files: {
				dest: '<%= path.dist %>/humans.txt',
			},
		},
		watch: {
			options: {
				livereload: false,
			},
			raml: {
				files: 'src/api.raml',
				tasks: 'copy:raml',
			},
		},
		connect: {
			server: {
				options: {
					livereload: true,
					port: 9000,
					base: '<%= path.dist %>',
				},
			},
		},
	});

	require('load-grunt-tasks')(grunt);

	// Task definition
	grunt.registerTask('default', ['clean', 'copy', 'humans_txt']);
	grunt.registerTask('server', 'connect:server:keepalive');
	grunt.registerTask('work', ['connect', 'watch']);
};

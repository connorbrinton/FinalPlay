module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var dirs = {
    app: 'app',
    temp: '.tmp',
    dist: 'dist',
    cws: 'cws' // The Chrome Web Store .zip directory
  };

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    dirs: dirs,
    pkg: pkg,

    copy: {
      temp: {
        files: [{
          expand: true,
          cwd: '<%= dirs.app %>',
          src: '**',
          dest: '<%= dirs.temp %>'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= dirs.temp %>',
          src: '**',
          dest: '<%= dirs.dist %>'
        }]
      }
    },

    compress: {
      cws: {
        files: [{
          expand: true,
          cwd: '<%= dirs.dist %>',
          src: '**'
        }],
        options: {
          archive: '<%= dirs.cws %>/<%= pkg.name %>.zip'
        }
      }
    },

    clean: {
    	temp: ["<%= dirs.temp %>"],
    	dist: ["<%= dirs.dist %>"],
    	cws: ["<%= dirs.cws %>"]
    }
  });

  grunt.registerTask('build', [
    'copy:temp',
    'copy:dist',
  ]);

  grunt.registerTask('cws', [
    'build',
    'compress:cws'
  ]);
};



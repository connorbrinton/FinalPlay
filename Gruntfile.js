module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var config = {
    app: 'app',
    temp: '.tmp',
    dist: 'dist',
    cws: 'cws' // The Chrome Web Store .zip directory
  };

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    config: config,
    pkg: pkg,

    copy: {
      temp: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: '**',
          dest: '<%= config.temp %>'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.temp %>',
          src: '**',
          dest: '<%= config.dist %>'
        }]
      }
    },

    compress: {
      cws: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '**'
        }],
        options: {
          archive: '<%= config.cws %>/<%= pkg.name %>.zip'
        }
      }
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



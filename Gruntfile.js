(function() {

'use strict';

module.exports = function(grunt) {

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  // Less
  less: {
    dev: {
      files: {
        "public/css/style.css": "public/css/style.less"
      }
    }
  },

  // Livereload
  watch: {
    scripts: {
      files: ['public/js/**/*.js'],
      options: {
        livereload: true
      }
    },
    css: {
      files: ['public/css/style.less'],
      tasks: ['less'],
      options: {
        livereload: true
      }
    },
    markup: {
      files: ['views/index.html'],
      options: {
        livereload: true
      }
    }
  }

});

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', ['less','watch']);

};

})();
var gulp = require('gulp');

var path = require('path');

var _ = require('lodash');

var livereload = require('gulp-livereload');

var cwd = process.cwd();

var default_config = {
  templates: { 
    files: [
      path.join(cwd, 'src', 'templates', '*.jade'),
      path.join(cwd, 'src', 'templates', '**', '*.jade')
    ],
    task: ['templates']
  },
  styles: { 
    files: [
      path.join(cwd, 'src', 'static', 'styles', '*.styl'),
      path.join(cwd, 'src', 'templates', '**', '*.styl')
    ],
    task: ['styles']
  },
  scripts: { 
    files: [
      path.join(cwd, 'src', 'static', 'scripts', '**')
    ],
    task: []
  }
};

var self = {
  config: default_config,
  run: function(config) {
    config = _.assign(this.config, config);
    watchFiles(config);
  }
};

function changed() {
  setTimeout(
    (function(a) {
      return function() {
        return livereload.changed.apply(livereload, a);
      };
    }(arguments)) , 100);
}

function watchFiles(config) {
  livereload.listen();

  _.each(config, function(src) {
    gulp.watch(src.files, src.task).on('change', changed);
  });
}

gulp.task('watch', function() {
  self.run();
});

module.exports = self;

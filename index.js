var gulp = require('gulp');

var path = require('path');

var _ = require('lodash');

var livereload = require('gulp-livereload');

var cwd = process.cwd();

var default_config = {
  templates: { 
    src: [
      path.join(cwd, 'src', 'templates', '*.jade'),
      path.join(cwd, 'src', 'templates', '**', '*.jade')
    ],
    task: ['templates']
  },
  styles: { 
    src: [
      path.join(cwd, 'src', 'static', 'styles', '*.styl'),
      path.join(cwd, 'src', 'static', 'styles', '**', '*.styl'),
      path.join(cwd, 'src', 'templates', '**', '*.styl')
    ],
    task: ['styles']
  },
  scripts: { 
    src: [
      path.join(cwd, 'src', 'static', 'scripts', '**')
    ],
    task: null
  }
};

var self = {
  config: default_config,
  set: function(config) {
    this.config = _.assign(this.config, config);
  },
  run: function(config) {
    watchFiles(config || this.config);
  }
};

function changed() {
  setTimeout(
    (function(a) {
      return function() {
        return livereload.changed.apply(livereload, a);
      };
    }(arguments)) , 100);

  if (typeof self.onChanged === 'function') {
    self.onChanged.apply(this, arguments);
  }
}

function watchFiles(config) {
  livereload.listen();

  _.each(config, function(item) {
    gulp.watch(item.src, item.task).on('change', changed);
  });
}

gulp.task('watch', function() {
  self.run();
});

module.exports = self;

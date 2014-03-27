module.exports = function(grunt) {

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            ejs: {
                files: [ 'cloud/views/**' ],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: [ 'gruntfile.js', 'server.js', 'public/build/**', 'cloud/**/*.js', 'misc/**/*.js' ],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: [ 'public/views/**' ],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: [ 'public/css/**' ],
                options: {
                    livereload: true
                }
            }
        },
        uglify: {
            production: {
                files: {
                    'public/build/js/dist.min.js': [
                        'public/my-lib/parse/parse.js',
                        'public/lib/angular/angular.js',
                        'public/lib/angular-cookies/angular-cookies.js',
                        'public/lib/angular-resource/angular-resource.js',
                        'public/lib/angular-ui-router/release/angular-ui-router.js',
                        'public/lib/angular-bootstrap/ui-bootstrap.js',
                        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                        'public/js/**/*.js' ]
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    "public/build/css/dist.min.css": [ "public/lib/bootstrap/dist/css/bootstrap.css", "public/css/**/*.css" ]
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: [ 'README.md', 'node_modules/**', '.DS_Store' ],
                    ext: 'js,html',
                    nodeArgs: [],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: [ 'nodemon', 'watch' ],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec'
            },
            src: [ 'test/mocha/**/*.js' ]
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        shell: {
            coverage: {
                command: 'istanbul cover node_modules/mocha/bin/_mocha ' + 'test/mocha/**/*.js' + ' -R spec',
                options: {
                    stdout: true
                }
            },
            cov_report: {
                command: 'open coverage/lcov-report/index.html',
                options: {
                    stdout: true
                }
            }
        }
    });

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('build', [ 'cssmin', 'uglify' ]);

    // Default task(s).
    grunt.registerTask('default', [ 'cssmin', 'uglify', 'concurrent' ]);

    // Test task.
    grunt.registerTask('test', [ 'env:test', 'mochaTest' ]);

    // Coverage task
    grunt.registerTask('cov', [ 'env:test', 'shell:coverage' ]);

    // Coverage report task
    grunt.registerTask('rpt', [ 'shell:cov_report' ]);
};
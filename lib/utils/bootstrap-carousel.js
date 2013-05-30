/**
 * Originally from bootstrap-carousel.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 *
 * Modified by abiyasa
 */

(function ($) {
    'use strict';

    /**
    * CAROUSEL CLASS DEFINITION
    */
    var Carousel = function (element, options) {
        this.$element = $(element);
        this.$indicators = this.$element.find('.carousel-indicators');
        this.options = options;
    };

    Carousel.prototype = {
        getActiveIndex: function () {
            this.$active = this.$element.find('.item.active');
            this.$items = this.$active.parent().children();
            return this.$items.index(this.$active);
        },

        to: function (pos) {
            var activeIndex = this.getActiveIndex(),
                that = this;

            if (pos > (this.$items.length - 1) || pos < 0) return;

            if (this.sliding) {
                return this.$element.one('slid', function () {
                    that.to(pos);
                });
            }

            return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]));
        },

        next: function () {
            if (this.sliding) return;
            return this.slide('next');
        },

        prev: function () {
            if (this.sliding) return;
            return this.slide('prev');
        },

        slide: function (type, next) {
            var $active = this.$element.find('.item.active'),
                $next = next || $active[type](),
                direction = type === 'next' ? 'left' : 'right',
                fallback = type === 'next' ? 'first' : 'last',
                that = this,
                e;

            this.sliding = true;

            $next = $next.length ? $next : this.$element.find('.item')[fallback]();

            e = $.Event('slide', {
                relatedTarget: $next[0],
                direction: direction
            });

            if ($next.hasClass('active')) return;

            if (this.$indicators.length) {
                this.$indicators.find('.active').removeClass('active');
                this.$element.one('slid', function () {
                    var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
                    if ($nextIndicator) {
                        $nextIndicator.addClass('active');
                    }
                });
            }

            if ($.support.transition && this.$element.hasClass('slide')) {
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) return;
                $next.addClass(type);
                /*
                if ($next[0]) {
                    $next[0].offsetWidth; // force reflow
                }
                */
                $active.addClass(direction);
                $next.addClass(direction);
                this.$element.one($.support.transition.end, function () {
                    $next.removeClass([type, direction].join(' ')).addClass('active');
                    $active.removeClass(['active', direction].join(' '));
                    that.sliding = false;
                    setTimeout(function () {
                        that.$element.trigger('slid');
                    }, 0);
                });
            } else {
                this.$element.trigger(e);
                if (e.isDefaultPrevented()) return;
                $active.removeClass('active');
                $next.addClass('active');
                this.sliding = false;
                this.$element.trigger('slid');
            }

            return this;
        }

    };

    /**
    * CAROUSEL PLUGIN DEFINITION
    */
    var old = $.fn.carousel;
    $.fn.carousel = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('carousel'),
                options = $.extend({}, $.fn.carousel.defaults, typeof option === 'object' && option),
                action = typeof option === 'string' ? option : options.slide;
            if (!data) {
                $this.data('carousel', (data = new Carousel(this, options)));
            }
            if (typeof option === 'number') {
                data.to(option);
            } else if (action) {
                data[action]();
            }
        });
    };
    $.fn.carousel.defaults = {
        /* no options */
    };
    $.fn.carousel.Constructor = Carousel;


    /**
    * CAROUSEL NO CONFLICT
    */
    $.fn.carousel.noConflict = function () {
        $.fn.carousel = old;
        return this;
    };

    /**
    * CAROUSEL DATA-API
    */
    $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
        var $this = $(this),
            href, $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')), //strip for ie7
            options = $.extend({}, $target.data(), $this.data());

        $target.carousel(options);

        var slideIndex = $this.attr('data-slide-to');
        if (slideIndex) {
            $target.data('carousel').to(slideIndex);
        }

        e.preventDefault();
    });
}(window.jQuery));

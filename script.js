var WORKS = [
    {
        name: 'Extensive Logistics',
        type: 'identity // web',
        description: 'MERLION &mdash; the largest full-range distributor of the Russian market',
        quote: 'Everything must be take into account. If the fact will not fit the theory &mdash; let the theory go.',
        quoteAuthor: 'Agatha Christie',
        numPages: 9,
    },
    {
        name: 'Digital Universe',
        type: 'web design',
        description: 'I.R.U. &mdash; reliability and thoroughness, harmony and balance and an endless choice of goods.',
        quote: 'If you think this Universe is bad, you should see some of the others.',
        quoteAuthor: 'Philip K. Dick',
        numPages: 9,
    },
    {
        name: 'Controlled Energy',
        type: 'web design // ui',
        numPages: 9,
     },
    {
        name: 'Misterious Party',
        numPages: 4,
    },
    {
        name: 'What Women Want',
        numPages: 3,
        customPages: {
            1: {
                type: 'video',
                src: 'kotiki_preview.mp4',
                css: {
                    position: 'absolute',
                    //width: '741px',
                    height: '464px',
                    top: '200px',
                    left: '300px',
                }
            }
        } 
    },
    {
        name: 'Business For Friends',
        numPages: 9,
    },
];

function toggleCurrent(work) {
    work.toggleClass('current');
    work.animate({ opacity: 'toggle' }, 1000);
}

function proceedCurrent(klass, next, loop) {
    var current = $(klass + '.current');

    toggleCurrent(current);

    var onexit = current[0].onexit;
    if (onexit)
        onexit();

    var next = current[next]();

    if (!next.length) {
        next = current.parent().children()[loop]();
    }

    var onenter = next[0].onenter;
    if (onenter)
        onenter();

    toggleCurrent(next);
}

function nextCurrent(klass) {
    proceedCurrent(klass, 'next', 'first');
}

function prevCurrent(klass) {
    proceedCurrent(klass, 'prev', 'last');
}

function toggleFull() {
    var work = $('.work.current');
    var preview = work.find('.preview');
    var full = work.find('.full');

    if (!full.is(':visible')) {
        var current = full.find('.page.current');
        var first = full.find('.page:first');
        if (current[0] !== first[0]) {
            current.removeClass('current').hide();
            first.addClass('current').show();
        }

        $('body').keydown(
            function(e) { 
                switch (e.keyCode) {
                    case 27:
                        $('body').off('keydown');
                        $('#work_controls #close').click();
                        break;
                    case 37:
                        $('#work_controls .previous').click();
                        break;
                    case 39:
                        $('#work_controls .next').click();
                        break;
                };
            }
        );
    }
    else {
        $('body').off('keydown');
    }

    full.animate({ opacity: 'toggle' }, 1000);
    preview.animate({ opacity: 'toggle' }, 1000);

    $("#controls").animate({ opacity: 'toggle' }, 1000);
    $("#work_controls").animate({ opacity: 'toggle' }, 1000);
    $("#menu").toggle('slide');
    var progress = $("#work_controls .progress");
    progress.css('width', (WORKS[work.index()].numPages * progress.find('.current').width()) + 'px');
    toggleGrid();

    var works = $('#works');
    var exclusive = works.hasClass('exclusive');
    
    if (exclusive) {
        //works.css('top', 800);
        $('html, body').scrollTop(800);
    }
    $('#intro').toggle();
    $('#skills').toggle();
    $('#about').toggle();

    $('.work.current .preview .background').toggle();

    if (!exclusive) {
        works.animate({ top: 0 }, 200);
    }

    if (exclusive) {
        //works.css('top', 800);
        //$("html, body").animate({ scrollTop:  605 }, 1500);
    }

    works.toggleClass('exclusive');
}

function toggleGrid() {
    var grid = $("#grid");

    var top = -19, height = 819, zIndex = 'auto';
    if (!grid.hasClass('bottom')) {
        top = 760, height = 41, zIndex = 1;
    }

    grid.animate(
        { top: top + "px", height: height + "px" }, 
        500
    );

    grid.css("z-index", zIndex);
    grid.toggleClass('bottom');
}

function initPages(work) {
    var full = work.find('.full');
    var page0 = full.find('.page.current');
    var pageTemplate = page0.clone();
    var workInfo = WORKS[work.index()];

    for (var j = 0; j < workInfo.numPages; j++) {
        var page = page0;
        var pageInfo = workInfo.customPages && workInfo.customPages[j];

        if (j > 0) {
            page = pageTemplate.clone();
            page.removeClass('current');
            full.append(page);
            page.toggle();
        }

        page.css('background', 'url(images/work_' + work.index() + '_' + j + '.jpg) center');

        if (pageInfo && pageInfo.type == 'video') {
            var video = $('<video/>');
            video[0].src = pageInfo.src;
            $.each(
                pageInfo.css,
                function(k, v) {
                    video.css(k, v);
                }
            );
            page.append(video);
            page[0].onenter = function() { video[0].currentTime = 0; video[0].play(); }
            page[0].onexit = function() { video[0].pause(); }
        }
    }
}

function initWorks() {
    var works = $('#works_');
    var work0 = works.find('.work');
    var workTemplate = work0.clone();

    for (var i = 0; i < WORKS.length; i++) {
        var workInfo = WORKS[i];
        var work = work0;

        if (i > 0) {
            work = workTemplate.clone();
            work.removeClass('current');
            works.append(work);
            work.toggle();
        }

        var preview = work.find('.preview');
        var content = preview.find('.content');

        preview.find('.background').css('background', 'url(images/work_' + i + '_bg.png) center');
        preview.find('.background2').css('background', 'url(images/work_' + i + 'e.png) center')

        $.each(
            ['type', 'name', 'description'],
            function(i, f) { 
                content.find('.' + f).html(workInfo[f])
            }
        );

        content.find('.quote .quote_text').html('&#8220;' + workInfo.quote + '&#8221;');
        content.find('.quote .quote_author').html('&mdash; ' + workInfo.quoteAuthor + ' &mdash;');

        initPages(work);
    }
}

function init() {
    $('.quote')
        .prepend('<div class="quote_left_bracket"></div>')
        .prepend('<div class="quote_right_bracket"></div>');

    initWorks();

 	$('#layer1').show();
	$('#layer2').animate({opacity: "toggle"}, 
		2000,
		function() {
			$('#layer3').animate({opacity: "toggle"}, 3000);
		}
	);
    $(window).scroll(
        function() {
            var scrollTop = $(window).scrollTop();

            $('section').each(
                function(n, section) {
                    var menuItem = $('#menu_' + section.id);
                    var isCurrent = menuItem.hasClass('current');

                    var inside = scrollTop > section.offsetTop - 10 && scrollTop < (section.offsetTop + 800);

                    if (!isCurrent) {
                        if (inside) {
                            menuItem.toggleClass('current');
                            menuItem.animate({ 'padding-left': '+10px' });
                        }
                    }
                    else {
                        if (!inside) {
                            menuItem.toggleClass('current');
                            menuItem.animate({ 'padding-left': '0px' });
                        }
                    }
                }
            );
        }
    );

    $("#controls .next").click(function() { nextCurrent('.work') });
    $("#controls .previous").click(function() { prevCurrent('.work') });
    $("#controls #clickable").click(toggleFull);

    function updateProgress() {
        var progress = $("#work_controls .progress .current");
        progress.css('left', ($('.work.current .page.current').index() * progress.width()) + 'px');
    }

    $("#work_controls #close").click(toggleFull);
    $("#work_controls .next").click(
        function() {
            nextCurrent('.work.current .page') 
            updateProgress();    
        }
    );
    $("#work_controls .previous").click(
        function() { 
            prevCurrent('.work.current .page');
            updateProgress();
        }
    );
}

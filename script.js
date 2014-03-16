var WORKS = [
    {
        name: 'Extensive Logistics',
        numPages: 9,
    },
    {
        name: 'Digital Universe',
        numPages: 9,
    },
    {
        name: 'Controlled Energy',
        numPages: 9,
     },
    {
        name: 'Misterious Party',
        numPages: 4,
    },
    {
        name: 'What Women Want',
        numPages: 3,
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
    var next = current[next]();
    if (!next.length) {
        next = current.parent().children()[loop]();
    }
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
    }

    full.animate({ opacity: 'toggle' }, 1000);
    preview.animate({ opacity: 'toggle' }, 1000);

    $("#controls").animate({ opacity: 'toggle' }, 1000);
    $("#work_controls").animate({ opacity: 'toggle' }, 1000);
    $("#menu").toggle('slide');
    var progress = $("#work_controls .progress");
    progress.css('width', (WORKS[work.index()].numPages * progress.find('.current').width()) + 'px');
    toggleGrid();

    var part2 = $('#part2');
    var exclusive = part2.hasClass('exclusive');

    
    if (exclusive) {
        part2.css('top', 800);
        $('html, body').scrollTop(800);
    }
    $('#part1').toggle();
    $('#part3').toggle();
    $('#part4').toggle();

    $('.work.current .preview .background').toggle();

    if (!exclusive) {
        part2.animate({ top: 0 }, 200);
    }

    if (exclusive) {
        part2.css('top', 800);
        //$("html, body").animate({ scrollTop:  605 }, 1500);
    }

    part2.toggleClass('exclusive');
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

    for (var j = 0; j < WORKS[work.index()].numPages; j++) {
        var page = page0;

        if (j > 0) {
            page = pageTemplate.clone();
            page.removeClass('current');
            full.append(page);
            page.toggle();
        }

        page.css('background', 'url(images/work_' + work.index() + '_' + j + '.jpg) center');
    }
}

function initWorks() {
    var works = $('#works');
    var work0 = works.find('.work');
    var workTemplate = work0.clone();

    for (var i = 0; i < WORKS.length; i++) {
        var work = work0;

        if (i > 0) {
            work = workTemplate.clone();
            work.removeClass('current');
            works.append(work);
            work.toggle();
        }

        work.find('.preview .background').css('background', 'url(images/work_' + i + '_bg.png) center');
        work.find('.preview .content').css('background', 'url(images/work_' + i + '.png) center');

        initPages(work);
    }

    console.log($('#works'));
}

function init() {
    initWorks();

 	$('#layer1').show();
	$('#layer2').animate({opacity: "toggle"}, 
		2000,
		function() {
			$('#layer3').animate({opacity: "toggle"}, 3000);
		}
	);
	$("#menu1").hover(
		function(e) {
			if (this.animatingShow) return;
			this.animatingShow = true;
			$("#menu_content").show();
			$("#menu_content_hidden").hide();
			$("#menu").animate({ left: "0px" }, 1000, function() { this.animatingShow = false; })
			;
		},
		function(e) {
			if (this.animatingHide) return;
			this.animatingHide = true;
			$("#menu").animate(
                { left: "-100px"}, 1000, 
                function() { 
			        $("#menu_content").hide();
			        $("#menu_content_hidden").show();
                    this.animatingHide = false; 
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

function init() {
 	$('#layer1').show();
	$('#layer2').animate({opacity: "toggle"}, 
		2000,
		function() {
			$('#layer3').animate({opacity: "toggle"}, 3000);
		}
	);
	$("#menu").hover(
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
	var works = ['work1', 'work2', 'work3'];
	var currentWork = 0;

    function nextWork() {
        $('#' + works[currentWork]).animate({opacity: "toggle"}, 1000);
        if (++currentWork >= works.length) {
            currentWork = 0;
        }
        $('#' + works[currentWork]).animate({opacity: "toggle"}, 1000);
    };

    function previousWork() {
        $('#' + works[currentWork]).animate({opacity: "toggle"}, 1000);
        if (--currentWork < 0) {
            currentWork = works.length - 1;
        }
        $('#' + works[currentWork]).animate({opacity: "toggle"}, 1000);
    }

    var pages = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9',];
    var currentPage = 0;

    function toggleGrid() {
        var grid = $("#grid .background");

        var top = -19, height = 819, zIndex = 'auto';
        if (grid.height() == 819) {
            top = 760, height = 41, zIndex = 1;
        }

        grid.animate(
            { top: top + "px", height: height + "px" }, 
            1000 
        );

        grid.css("z-index", zIndex);
    }

    function toggleWork() {
        var workId = "#" + works[currentWork];
        $(workId + " .preview").animate({ opacity: "toggle"}, 1000);
        $(workId + " .full").animate({ opacity: "toggle"}, 1000);
        $("#controls").animate({ opacity: "toggle"}, 1000);
        $("#work_controls").animate({ opacity: "toggle"}, 1000);
        $("#work_controls .progress").css('width', (pages.length * 50) + 'px');
        toggleGrid();
    }

    function nextPage() {
        $('#' + works[currentWork] + ' .' + pages[currentPage]).animate({opacity: "toggle"}, 1000);
        if (++currentPage >= pages.length) {
            currentPage = 0;
        }
        $('#' + works[currentWork] + ' .' + pages[currentPage]).animate({opacity: "toggle"}, 1000);
        $("#work_controls .current").css('left', (currentPage * 50) + 'px');
    }

    function previousPage() {
        $('#' + works[currentWork] + ' .' + pages[currentPage]).animate({opacity: "toggle"}, 1000);
        if (--currentPage < 0) {
            currentPage = pages.length - 1;
        }
        $('#' + works[currentWork] + ' .' + pages[currentPage]).animate({opacity: "toggle"}, 1000);
        $("#work_controls .current").css('left', (currentPage * 50) + 'px');
    }

    $("#controls .next").click(nextWork);
    $("#controls .previous").click(previousWork);
    $("#controls #clickable").click(toggleWork);

    $("#work_controls #close").click(toggleWork);
    $("#work_controls .next").click(nextPage);
    $("#work_controls .previous").click(previousPage);
}
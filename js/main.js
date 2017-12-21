var $document = $(document);
var currModal = null;
function init() {
    $document.ready(function () {
        navBar();
        displayChart();
        smoothScroll();
        expandProject();
        collapseProject();
        setAspectRatio();
        clickResume();
        $(window).resize(function () {
            setAspectRatio();
        });
        $(window).on("click", function () {
            setAspectRatio();
        });
    });
}
function expandProject() {
    $(".preview-container").on("click", function (e) {
        var modalContainer = $(this).parent().find(".modal-container");
        modalContainer.css("display", "flex");
        currModal = modalContainer.find(".modal-icon-container");
        $("body").addClass("overflow-hidden");
    });
}
function collapseProject() {
    $(".modal-return, .modal-close").on("click", function (e) {
        $(".modal-container").css("display", "none");
        $("body").removeClass("overflow-hidden");
    });
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            $(".modal-container").css("display", "none");
            $("body").removeClass("overflow-hidden");
        }
    });
}
function navBar() {
    $document.on("scroll", function (e) {
        if ($document.scrollTop() >= 0.25 * $(window).height()) {
            $("nav").removeClass("big-nav").addClass("mini-nav");
        }
        else {
            $("nav").removeClass("mini-nav").addClass("big-nav");
        }
    });
}
function smoothScroll() {
    $("a[href^='#']").on("click", function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $("html, body").animate({
            scrollTop: $target.offset().top
        }, 250, "swing", function () {
            window.location.hash = target;
        });
    });
}
function setAspectRatio() {
    var preview = $(".preview-content");
    preview.css({ "width": "100%" });
    preview.css({ "height": preview.width() * 0.5625 });
    if (currModal !== null) {
        currModal.css({ "width": "100%" });
        currModal.css({ "height": currModal.width() * 0.5625 });
    }
}
function displayChart() {
    Chart.defaults.global.animation.duration = 500;
    var options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                    gridLines: {
                        display: true,
                        color: "rgba(255, 255, 255, 0.1)",
                        zeroLineColor: "rgba(255, 255, 255, 0.5)",
                        zeroLinewidth: 5
                    },
                    ticks: {
                        max: 5,
                        min: -1,
                        fontColor: "rgba(255, 255, 255, 1)",
                        fontFamily: "Helvetica",
                        fontSize: 16,
                        stepSize: 1,
                        padding: 10
                    }
                }],
            xAxes: [{
                    gridLines: {
                        display: true,
                        color: "rgba(255, 255, 255, 0.1)",
                        zeroLineColor: "rgba(255, 255, 255, 0.5)",
                        zeroLinewidth: 5
                    },
                    ticks: {
                        fontColor: "rgba(255, 255, 255, 1)",
                        fontFamily: "Helvetica",
                        fontSize: 16
                    }
                }]
        },
        tooltips: {
            enabled: false
        }
    };
    new Chart(document.getElementById("skill-chart"), {
        type: "bar",
        options: options,
        data: {
            labels: ["Coding", "Algorithm", "Design", "Creativity", "Personality"],
            datasets: [
                {
                    label: "yAxis",
                    backgroundColor: [
                        "rgba(46, 204, 113, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(200, 150, 230, 1)",
                        "rgba(255, 165, 0, 1)",
                        "rgba(174, 218, 230, 1)"
                    ],
                    data: [3, 2, 1, 3, -1]
                }
            ]
        }
    });
}
function clickResume() {
    $("#resume-button").on("click", function () {
        $(this).css("display", "none");
        $(".experience-button").css("display", "flex");
    });
}
window.onload = function () {
    init();
};

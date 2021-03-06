var $document = $(document);
var currModal = null;
function init() {
    $document.ready(function () {
        navBar();
        displayChart();
        smoothScroll();
        collapseProject();
        setAspectRatio();
        clickResume();
        previewContainerClick();
        previewContainerPress();
        $(window).resize(function () {
            setAspectRatio();
        });
    });
}
function previewContainerClick() {
    $(".preview-container").on("click", function (e) {
        expandProject(e, $(this));
    });
}
function previewContainerPress() {
    $(".preview-container").keydown(function (e) {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            expandProject(e, $(this));
        }
    });
}
function expandProject(e, that) {
    var modalContainer = that.parent().find(".modal-container");
    toggleButton(e.target);
    modalContainer.css("display", "flex");
    currModal = modalContainer.find(".modal-icon-container");
    $("body").addClass("overflow-hidden");
    setAspectRatio();
}
function collapseProject() {
    $(".modal-return, .modal-button-close, .modal-button-icon-container, .modal-button-icon, .modal-close").on("click", function () {
        $(".modal-container").css("display", "none");
        $("body").removeClass("overflow-hidden");
        setAspectRatio();
    });
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            $(".modal-container").css("display", "none");
            $("body").removeClass("overflow-hidden");
            setAspectRatio();
        }
    });
}
function navBar() {
    $document.on("scroll", function () {
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
function toggleButton(element) {
    var pressed = (element.getAttribute("aria-pressed") === "true");
    element.setAttribute("aria-pressed", !pressed);
}

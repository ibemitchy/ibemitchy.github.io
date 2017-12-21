let $document = $(document);
let currModal = null;

function init(): void {
    $document.ready(function (): void {
        navBar();
        displayChart();
        smoothScroll();
        expandProject();
        collapseProject();
        setAspectRatio();
        clickResume();

        $(window).resize(function (): void {
            setAspectRatio();
        });

        $(window).on("click", function (): void {
            setAspectRatio();
        });
    });
}

function expandProject(): void {
    $(".preview-container").on("click", function (): void {
        let modalContainer = $(this).parent().find(".modal-container");

        modalContainer.css("display", "flex");
        currModal = modalContainer.find(".modal-icon-container");
        $("body").addClass("overflow-hidden");
    });
}

function collapseProject(): void {
    $(".modal-return, .modal-close").on("click", function (): void {
        $(".modal-container").css("display", "none");
        $("body").removeClass("overflow-hidden");
    });

    $(document).keyup(function (e): void {
        if (e.keyCode === 27) {
            $(".modal-container").css("display", "none");
            $("body").removeClass("overflow-hidden");
        }
    });
}

function navBar(): void {
    $document.on("scroll", function (): void {
        if ($document.scrollTop() >= 0.25 * $(window).height()) {
            $("nav").removeClass("big-nav").addClass("mini-nav");
        } else {
            $("nav").removeClass("mini-nav").addClass("big-nav");
        }
    });
}

function smoothScroll(): void {
    $("a[href^='#']").on("click", function (e): void {
        e.preventDefault();

        let target = this.hash;
        let $target = $(target);
        $("html, body").animate({
            scrollTop: $target.offset().top
        }, 250, "swing", function (): void {
            window.location.hash = target;
        });
    });
}

function setAspectRatio(): void {
    let preview = $(".preview-content");
    preview.css({"width": "100%"});
    preview.css({"height": preview.width() * 0.5625});

    if (currModal !== null) {
        currModal.css({"width": "100%"});
        currModal.css({"height": currModal.width() * 0.5625});
    }
}

function displayChart(): void {
    Chart.defaults.global.animation.duration = 500;

    let options = {
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

function clickResume(): void {
    $("#resume-button").on("click", function (): void {
        $(this).css("display", "none");
        $(".experience-button").css("display", "flex");
    });
}

window.onload = function () {
    init();
};

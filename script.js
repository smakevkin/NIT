document.addEventListener("DOMContentLoaded", () => {
    const svg = d3.select("#scene");
    const width = 620;
    const height = 620;

    const drawBtn = document.getElementById("drawBtn");
    const animateBtn = document.getElementById("animateBtn");
    const clearBtn = document.getElementById("clearBtn");

    let mainGroup = null;
    let figureGroup = null;
    let pathSegments = [];
    let movingDot = null;

    const pathCoords = [
        { x: 510, y: 520 },
        { x: 510, y: 110 },
        { x: 345, y: 520 },
        { x: 150, y: 110 },
        { x: 150, y: 520 }
    ];

    function clearScene() {
        svg.selectAll("*").remove();
        mainGroup = null;
        figureGroup = null;
        pathSegments = [];
        movingDot = null;
    }

    function drawFigure() {
        clearScene();

        mainGroup = svg.append("g").attr("id", "mainGroup");
        figureGroup = mainGroup.append("g").attr("id", "figureGroup");

        const p1 = { x: 510, y: 520 };
        const p2 = { x: 510, y: 110 };
        const p3 = { x: 345, y: 520 };
        const p4 = { x: 150, y: 110 };
        const p5 = { x: 150, y: 520 };

        pathSegments = [];

        pathSegments.push(
            figureGroup.append("line")
                .attr("x1", p1.x).attr("y1", p1.y)
                .attr("x2", p2.x).attr("y2", p2.y)
                .attr("stroke", "blue").attr("stroke-width", 3)
        );
        pathSegments.push(
            figureGroup.append("line")
                .attr("x1", p2.x).attr("y1", p2.y)
                .attr("x2", p3.x).attr("y2", p3.y)
                .attr("stroke", "blue").attr("stroke-width", 3)
        );
        pathSegments.push(
            figureGroup.append("line")
                .attr("x1", p3.x).attr("y1", p3.y)
                .attr("x2", p4.x).attr("y2", p4.y)
                .attr("stroke", "blue").attr("stroke-width", 3)
        );
        pathSegments.push(
            figureGroup.append("line")
                .attr("x1", p4.x).attr("y1", p4.y)
                .attr("x2", p5.x).attr("y2", p5.y)
                .attr("stroke", "blue").attr("stroke-width", 3)
        );
    }

    function prepareLineAnimation(lineSelection) {
        const x1 = +lineSelection.attr("x1");
        const y1 = +lineSelection.attr("y1");
        const x2 = +lineSelection.attr("x2");
        const y2 = +lineSelection.attr("y2");
        const length = Math.hypot(x2 - x1, y2 - y1);

        lineSelection
            .interrupt()
            .attr("stroke-dasharray", length)
            .attr("stroke-dashoffset", length);

        return length;
    }

    function applyGroupTransform(t) {
        const scaleFrom = parseFloat(document.getElementById("scaleFrom").value);
        const scaleTo = parseFloat(document.getElementById("scaleTo").value);
        const rotation = parseFloat(document.getElementById("rotation").value);

        const scale = scaleFrom + (scaleTo - scaleFrom) * t;
        const angle = rotation * t;

        figureGroup.attr(
            "transform",
            `translate(${width / 2}, ${height / 2}) rotate(${angle}) scale(${scale}) translate(${-width / 2}, ${-height / 2})`
        );
    }

    function animatePathSegment(index, segmentDurations) {
        if (index >= pathSegments.length) return;

        const seg = pathSegments[index];
        const duration = segmentDurations[index];
        const start = pathCoords[index];
        const end = pathCoords[index + 1];

        movingDot
            .interrupt()
            .attr("cx", start.x)
            .attr("cy", start.y);

        seg.transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        movingDot.transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attrTween("cx", () => t => start.x + (end.x - start.x) * t)
            .attrTween("cy", () => t => start.y + (end.y - start.y) * t)
            .on("end", () => {
                animatePathSegment(index + 1, segmentDurations);
            });
    }

    function animateFigure() {
        if (!figureGroup || pathSegments.length === 0) {
            drawFigure();
        }

        const duration = parseInt(document.getElementById("duration").value, 10);

        pathSegments.forEach(prepareLineAnimation);

        if (movingDot) {
            movingDot.remove();
        }

        movingDot = figureGroup.append("circle")
            .attr("r", 10)
            .attr("fill", "red")
            .attr("cx", pathCoords[0].x)
            .attr("cy", pathCoords[0].y);

        applyGroupTransform(0);

        d3.transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .tween("groupTransform", () => t => applyGroupTransform(t));

        const pathLengths = pathSegments.map(seg =>
            Math.hypot(+seg.attr("x2") - +seg.attr("x1"), +seg.attr("y2") - +seg.attr("y1"))
        );

        const totalPathLength = pathLengths.reduce((s, l) => s + l, 0);

        const segmentDurations = pathLengths.map(l =>
            totalPathLength === 0 ? 0 : (l / totalPathLength) * duration
        );

        animatePathSegment(0, segmentDurations);
    }

    drawBtn.addEventListener("click", drawFigure);
    animateBtn.addEventListener("click", animateFigure);
    clearBtn.addEventListener("click", clearScene);
});
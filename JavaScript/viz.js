const VIZ = (() => {
            const fieldLabels = {
                size: "Размер", activity: "Активность", purpose: "Назначение",
                coat: "Тип шерсти", apartment: "Квартира", country: "Страна"
            };

            const orderedValues = {
                size: ["маленький", "средний", "большой", "гигантский"],
                activity: ["низкая", "средняя", "высокая"],
                apartment: ["нет", "да"],
                purpose: ["компаньон", "охотничья", "охранная", "пастушья", "служебная"],
                coat: ["без шерсти", "короткая", "жёсткая", "средняя", "кудрявая", "длинная"]
            };

            const numMap = {
                size:     { "маленький": 1, "средний": 2, "большой": 3, "гигантский": 4 },
                activity: { "низкая": 1, "средняя": 2, "высокая": 3 },
                apartment:{ "нет": 1, "да": 2 },
                purpose:  { "компаньон": 1, "охотничья": 2, "охранная": 3, "пастушья": 4, "служебная": 5 },
                coat:     { "без шерсти": 1, "короткая": 2, "жёсткая": 3, "средняя": 4, "кудрявая": 5, "длинная": 6 }
            };

            const numLabel = {
                size:     { 1:"маленький", 2:"средний", 3:"большой", 4:"гигантский" },
                activity: { 1:"низкая", 2:"средняя", 3:"высокая" },
                apartment:{ 1:"нет", 2:"да" },
                purpose:  { 1:"компаньон", 2:"охотничья", 3:"охранная", 4:"пастушья", 5:"служебная" },
                coat:     { 1:"без шерсти", 2:"короткая", 3:"жёсткая", 4:"средняя", 5:"кудрявая", 6:"длинная" }
            };

            const purposeColors = {
                "компаньон":"#3b7dd8","охотничья":"#e07b39",
                "охранная":"#c0392b","пастушья":"#27ae60","служебная":"#8e44ad"
            };

            const tip = document.getElementById("vizTooltip");

            function showTip(event, html) {
                tip.innerHTML = html;
                tip.style.opacity = "1";
                tip.style.left = (event.clientX + 14) + "px";
                tip.style.top  = (event.clientY - 30) + "px";
            }

            function moveTip(event) {
                tip.style.left = (event.clientX + 14) + "px";
                tip.style.top  = (event.clientY - 30) + "px";
            }

            function hideTip() { tip.style.opacity = "0"; }

            function getCategories(field, data) {
                if (orderedValues[field]) {
                    const present = new Set(data.map(d => d[field]));
                    return orderedValues[field].filter(v => present.has(v));
                }
                return [...new Set(data.map(d => d[field]))].sort();
            }

            function groupCount(field, data) {
                const cats = getCategories(field, data);
                const map = {};
                data.forEach(d => { map[d[field]] = (map[d[field]] || 0) + 1; });
                return cats.map(c => ({ label: c, count: map[c] || 0 }));
            }

            function drawBar(data, xField) {
                const svg = d3.select("#vizChart");
                svg.selectAll("*").remove();
                document.getElementById("vizLegend").innerHTML = "";

                const grouped = groupCount(xField, data);
                const M = { top: 30, right: 20, bottom: 80, left: 50 };
                const TW = svg.node().parentElement.clientWidth || 700;
                const TH = 360;
                const W = TW - M.left - M.right;
                const H = TH - M.top - M.bottom;
                svg.attr("viewBox", `0 0 ${TW} ${TH}`).attr("height", TH);

                const g = svg.append("g").attr("transform", `translate(${M.left},${M.top})`);

                const x = d3.scaleBand().domain(grouped.map(d => d.label)).range([0, W]).padding(0.3);
                const y = d3.scaleLinear().domain([0, d3.max(grouped, d => d.count) + 1]).range([H, 0]).nice();

                g.append("g").attr("class","viz-grid")
                    .call(d3.axisLeft(y).ticks(5).tickSize(-W).tickFormat(""));

                g.append("g").attr("class","viz-axis").attr("transform",`translate(0,${H})`)
                    .call(d3.axisBottom(x))
                    .selectAll("text").attr("transform","rotate(-35)").style("text-anchor","end").attr("dx","-0.5em").attr("dy","0.1em");

                g.append("g").attr("class","viz-axis")
                    .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("d")));

                g.append("text").attr("class","viz-axlabel").attr("x", W/2).attr("y", H+72).attr("text-anchor","middle").text(fieldLabels[xField]);
                g.append("text").attr("class","viz-axlabel").attr("transform","rotate(-90)").attr("x",-H/2).attr("y",-40).attr("text-anchor","middle").text("Количество пород");

                g.selectAll(".viz-bar").data(grouped).join("rect")
                    .attr("class","viz-bar")
                    .attr("x", d => x(d.label)).attr("y", d => y(d.count))
                    .attr("width", x.bandwidth()).attr("height", d => H - y(d.count))
                    .on("mousemove", (event, d) => {
                        const names = data.filter(dog => dog[xField] === d.label).map(dog => dog.name).join(", ");
                        showTip(event, `<strong>${d.label}</strong><br>Количество: ${d.count}<br><span style="font-size:11px;opacity:.8">${names}</span>`);
                        moveTip(event);
                    }).on("mouseleave", hideTip);

                g.selectAll(".viz-barlabel").data(grouped).join("text")
                    .attr("class","viz-barlabel")
                    .attr("x", d => x(d.label) + x.bandwidth()/2).attr("y", d => y(d.count) - 5)
                    .attr("text-anchor","middle").text(d => d.count || "");
            }

            function drawLine(data, xField) {
                const svg = d3.select("#vizChart");
                svg.selectAll("*").remove();
                document.getElementById("vizLegend").innerHTML = "";

                const grouped = groupCount(xField, data);
                const M = { top: 30, right: 20, bottom: 80, left: 50 };
                const TW = svg.node().parentElement.clientWidth || 700;
                const TH = 360;
                const W = TW - M.left - M.right;
                const H = TH - M.top - M.bottom;
                svg.attr("viewBox", `0 0 ${TW} ${TH}`).attr("height", TH);

                const g = svg.append("g").attr("transform", `translate(${M.left},${M.top})`);

                const x = d3.scalePoint().domain(grouped.map(d => d.label)).range([0, W]).padding(0.4);
                const y = d3.scaleLinear().domain([0, d3.max(grouped, d => d.count) + 1]).range([H, 0]).nice();

                g.append("g").attr("class","viz-grid")
                    .call(d3.axisLeft(y).ticks(5).tickSize(-W).tickFormat(""));

                g.append("g").attr("class","viz-axis").attr("transform",`translate(0,${H})`)
                    .call(d3.axisBottom(x))
                    .selectAll("text").attr("transform","rotate(-35)").style("text-anchor","end").attr("dx","-0.5em").attr("dy","0.1em");

                g.append("g").attr("class","viz-axis")
                    .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format("d")));

                g.append("text").attr("class","viz-axlabel").attr("x", W/2).attr("y", H+72).attr("text-anchor","middle").text(fieldLabels[xField]);
                g.append("text").attr("class","viz-axlabel").attr("transform","rotate(-90)").attr("x",-H/2).attr("y",-40).attr("text-anchor","middle").text("Количество пород");

                const line = d3.line().x(d => x(d.label)).y(d => y(d.count)).curve(d3.curveMonotoneX);
                g.append("path").datum(grouped).attr("class","viz-line").attr("d", line);

                g.selectAll(".viz-dot").data(grouped).join("circle")
                    .attr("class","viz-dot").attr("cx", d => x(d.label)).attr("cy", d => y(d.count)).attr("r", 6)
                    .on("mousemove", (event, d) => {
                        const names = data.filter(dog => dog[xField] === d.label).map(dog => dog.name).join(", ");
                        showTip(event, `<strong>${d.label}</strong><br>Количество: ${d.count}<br><span style="font-size:11px;opacity:.8">${names}</span>`);
                        moveTip(event);
                    }).on("mouseleave", hideTip);

                g.selectAll(".viz-dlabel").data(grouped).join("text")
                    .attr("x", d => x(d.label)).attr("y", d => y(d.count) - 11)
                    .attr("text-anchor","middle").style("font-size","12px").style("fill","#3b7dd8").style("font-weight","500")
                    .text(d => d.count || "");
            }

            function drawScatter(data, xField, yField) {
                const svg = d3.select("#vizChart");
                svg.selectAll("*").remove();

                const M = { top: 30, right: 20, bottom: 90, left: 70 };
                const TW = svg.node().parentElement.clientWidth || 700;
                const TH = 420;
                const W = TW - M.left - M.right;
                const H = TH - M.top - M.bottom;
                svg.attr("viewBox", `0 0 ${TW} ${TH}`).attr("height", TH);

                const g = svg.append("g").attr("transform", `translate(${M.left},${M.top})`);

                function getNum(dog, field) {
                    if (field === "country") {
                        const countries = [...new Set(dogs.map(d => d.country))].sort();
                        return countries.indexOf(dog.country) + 1;
                    }
                    return numMap[field]?.[dog[field]] ?? 0;
                }

                function getLabel(val, field) {
                    if (field === "country") {
                        const countries = [...new Set(dogs.map(d => d.country))].sort();
                        return countries[val - 1] || val;
                    }
                    return numLabel[field]?.[val] ?? val;
                }

                const plotData = data.map(dog => ({
                    dog,
                    xv: getNum(dog, xField),
                    yv: getNum(dog, yField)
                })).filter(d => d.xv && d.yv);

                const xe = d3.extent(plotData, d => d.xv);
                const ye = d3.extent(plotData, d => d.yv);
                const x = d3.scaleLinear().domain([xe[0]-.6, xe[1]+.6]).range([0, W]);
                const y = d3.scaleLinear().domain([ye[0]-.6, ye[1]+.6]).range([H, 0]);

                const xTicks = [...new Set(plotData.map(d => d.xv))].sort((a,b)=>a-b);
                const yTicks = [...new Set(plotData.map(d => d.yv))].sort((a,b)=>a-b);

                g.append("g").attr("class","viz-grid").call(d3.axisLeft(y).tickValues(yTicks).tickSize(-W).tickFormat(""));
                g.append("g").attr("class","viz-grid").attr("transform",`translate(0,${H})`).call(d3.axisBottom(x).tickValues(xTicks).tickSize(-H).tickFormat(""));

                g.append("g").attr("class","viz-axis").attr("transform",`translate(0,${H})`)
                    .call(d3.axisBottom(x).tickValues(xTicks).tickFormat(v => getLabel(v, xField)))
                    .selectAll("text").attr("transform","rotate(-30)").style("text-anchor","end").attr("dx","-0.4em").attr("dy","0.1em");

                g.append("g").attr("class","viz-axis")
                    .call(d3.axisLeft(y).tickValues(yTicks).tickFormat(v => getLabel(v, yField)));

                g.append("text").attr("class","viz-axlabel").attr("x",W/2).attr("y",H+82).attr("text-anchor","middle").text(fieldLabels[xField]);
                g.append("text").attr("class","viz-axlabel").attr("transform","rotate(-90)").attr("x",-H/2).attr("y",-58).attr("text-anchor","middle").text(fieldLabels[yField]);

                function jx(d) {
                    const h = d.dog.name.split("").reduce((a,c) => a+c.charCodeAt(0), 0);
                    return (((h * 17) % 100)/100 - 0.5) * 0.3;
                }
                function jy(d) {
                    const h = d.dog.name.split("").reduce((a,c) => a+c.charCodeAt(0), 13);
                    return (((h * 31) % 100)/100 - 0.5) * 0.3;
                }

                g.selectAll(".viz-sdot").data(plotData).join("circle")
                    .attr("class","viz-sdot")
                    .attr("cx", d => x(d.xv + jx(d))).attr("cy", d => y(d.yv + jy(d))).attr("r", 7)
                    .style("fill", d => purposeColors[d.dog.purpose] || "#3b7dd8")
                    .style("stroke", d => purposeColors[d.dog.purpose] || "#1a5cb8")
                    .on("mousemove", (event, d) => {
                        showTip(event,
                            `<strong>${d.dog.name}</strong><br>` +
                            `${fieldLabels[xField]}: ${d.dog[xField]}<br>` +
                            `${fieldLabels[yField]}: ${d.dog[yField]}<br>` +
                            `Назначение: ${d.dog.purpose}`
                        );
                        moveTip(event);
                    }).on("mouseleave", hideTip);

                const legendEl = document.getElementById("vizLegend");
                legendEl.innerHTML = Object.entries(purposeColors).map(([label, color]) =>
                    `<span class="viz-legend-item"><span class="viz-legend-dot" style="background:${color}"></span>${label}</span>`
                ).join("");
            }

            let _currentData = [];

            function render(data) {
                _currentData = data || [];
                if (document.getElementById("vizPanel").style.display === "none") return;

                const type  = document.getElementById("chartType").value;
                const xField = document.getElementById("xField").value;
                const yField = document.getElementById("yField").value;
                const yGroup = document.getElementById("yFieldGroup");

                document.getElementById("vizCount").textContent =
                    `Показано пород: ${_currentData.length}`;

                if (type === "scatter") {
                    yGroup.style.display = "";
                    drawScatter(_currentData, xField, yField);
                } else {
                    yGroup.style.display = "none";
                    document.getElementById("vizLegend").innerHTML = "";
                    if (type === "bar") drawBar(_currentData, xField);
                    else drawLine(_currentData, xField);
                }
            }

            document.getElementById("vizToggle").addEventListener("click", () => {
                const panel = document.getElementById("vizPanel");
                const btn   = document.getElementById("vizToggle");
                if (panel.style.display === "none") {
                    panel.style.display = "";
                    btn.textContent = "▲ Скрыть визуализацию";
                    render(_currentData);
                } else {
                    panel.style.display = "none";
                    btn.textContent = "▼ Показать визуализацию";
                }
            });

            ["chartType","xField","yField"].forEach(id => {
                document.getElementById(id).addEventListener("change", () => render(_currentData));
            });

            window.addEventListener("resize", () => render(_currentData));

            return { render };
        })();
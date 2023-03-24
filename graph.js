



function main() {




    //Graph
    d3.csv("birdstrikes.csv").then(function (data) {



        var listobj = data.map((d) => {
            return {
                state: d["Origin State"],
                airport: d["Airport Name"],
                aircraft: d["Aircraft Make Model"],
                damage: d["Effect Amount of damage"],
                timeofDay: d["Flight Date"],
            };
        });



        const grouped = d3.rollup(
            listobj,
            (v) => v.length,
            (d) => d.state,
            (d) => d.airport,
            (d) => d.damage,
        );

        console.log('grouped object below:');
        console.log(grouped);



        const drag = (simulation) => {

            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }


        function chart(data) {

            var width = 1000;
            var height = 1000;


            //const root = d3.hierarchy(data);
            const links = data.links();
            const nodes = data.descendants();

            const sizeScale = d3.scaleLinear().domain([0, 2000]).range([5, 40]);

            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(0.5))
                .force("charge", d3.forceManyBody().strength(-50))
                .force("x", d3.forceX())
                .force("y", d3.forceY());

            const svg = d3.select("#svg4")
                .attr("viewBox", [-width / 2, -height / 2, width, height]);

            const link = svg.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line");

            const node = svg.append("g")
                .attr("fill", "#fff")
                .attr("stroke", "#000")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("fill", d => d.children ? null : "#000")
                .attr("stroke", d => d.children ? null : "#fff")
                .attr("r", 3.5)
                .call(drag(simulation));

            node.append("title")
                .text(d => d.data[0]);


            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);
            });


            let zoom = d3.zoom().on('zoom', zoomFunction);

            function zoomFunction(z) {
                svg.select('g').attr('transform', z.transform);
                svg.selectAll('circle').attr('transform', z.transform);

            }

            function initzoom(z) {
                svg.call(zoom);
            }
            initzoom();


            return svg.node();
        }

        var root = d3.hierarchy(grouped);
        chart(root)

        console.log(root);


    })



    var svg = d3.select("#svg1");
    const margin = { top: 150, bottom: 300, left: 150, right: 150 };
    const width = 1000;
    const height = 1000;

    const dates = [];
    var i = 0;

    const incident_counts = [
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
        { incident_count: 0 },
    ]

    const distinct =
        { year: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], incidents: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };

    d3.csv("birdstrikes.csv").then(function (data) {
        var keysof = data.columns;
        data.forEach(function (d) {
            dates.push(d["Flight Date"].slice(d["Flight Date"].lastIndexOf('/') + 1));
            if (dates[i] == "1990") {
                incident_counts[0].incident_count++;
            }

            if (dates[i] == "1991") {
                incident_counts[1].incident_count++;
            }
            if (dates[i] == "1992") {
                incident_counts[2].incident_count++;
            }
            if (dates[i] == "1993") {
                incident_counts[3].incident_count++;
            }
            if (dates[i] == "1994") {
                incident_counts[4].incident_count++;
            }
            if (dates[i] == "1995") {
                incident_counts[5].incident_count++;
            }
            if (dates[i] == "1996") {
                incident_counts[6].incident_count++;
            }
            if (dates[i] == "1997") {
                incident_counts[7].incident_count++;
            }
            if (dates[i] == "1998") {
                incident_counts[8].incident_count++;
            }
            if (dates[i] == "1999") {
                incident_counts[9].incident_count++;
            }
            if (dates[i] == "2000") {
                incident_counts[10].incident_count++;
            }
            if (dates[i] == "2001") {
                incident_counts[11].incident_count++;
            }
            if (dates[i] == "2002") {
                incident_counts[12].incident_count++;
            }
            i++;
        });

        var k = 0;

        distinct.year[0] = dates[0];
        for (var j = 0; j < dates.length; j++) {

            distinct.incidents[k]++;
            if (j != 0) {
                if (dates[j] != dates[j - 1]) {
                    k++;
                    distinct.year[k] = dates[j];
                }

            }

        }




        //analysis            
        function line(data) {


            const svg = d3.select("#svg1")
                .attr('height', height - margin.top - margin.bottom)
                .attr('width', width - margin.left - margin.right)
                .attr('viewBox', [0, 0, width, height]);

           

            var x = d3.scaleLinear().domain([1990, 2002]).range([0, 1090]);
            var y = d3.scaleLinear().domain([1100, 400]).range([0, 800]);

            var g = svg.append("g").attr("transform", "translate(" + 0 + "," + 190 + ")");



            g.append("g")
                .attr("id", "xaxis")
                .call(d3.axisBottom(x));



            g.append("g")
                .call(d3.axisLeft(y));

            d3.select("svg").append('g')
                .selectAll("dot")
                .data(distinct.incidents, function (d) { return d; })
                .enter()
                .append("circle")
                .attr("cx", function (d, i) { return d.year, i; })
                .attr("cy", function (d) { return height - d; })
                .attr("r", 10)
                .attr("transform", function (d, i) {
                    var translate = [90 * i, 380];
                    return "translate(" + translate + ")"
                })
                .style("fill", "#CC0000");



            var xline = 0;


            svg.append("text")
                .attr("id", "behaviour464")
                .attr("x", 25)
                .attr("opacity", "0")
                .attr("y", 920)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1990");



            svg.append("text")
                .attr("id", "behaviour571")
                .attr("x", 90)
                .attr("opacity", "0")
                .attr("y", 832)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1991");



            svg.append("text")
                .attr("id", "behaviour657")
                .attr("x", 180)
                .attr("opacity", "0")
                .attr("y", 748)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1992");




            //var arrayincidents = [464, 571, 657, 667, 713, 752, 865, 907, 941, 1065, 1095, 626];

            svg.append("text")
                .attr("id", "behaviour677")
                .attr("x", 270)
                .attr("opacity", "0")
                .attr("y", 730)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1993");




            svg.append("text")
                .attr("id", "behaviour667")
                .attr("x", 363)
                .attr("opacity", "0")
                .attr("y", 735)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1994");


            svg.append("text")
                .attr("id", "behaviour713")
                .attr("x", 455)
                .attr("opacity", "0")
                .attr("y", 690)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1995");


            svg.append("text")
                .attr("id", "behaviour752")
                .attr("x", 545)
                .attr("opacity", "0")
                .attr("y", 650)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1996");



            svg.append("text")
                .attr("id", "behaviour865")
                .attr("x", 635)
                .attr("opacity", "0")
                .attr("y", 540)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1997");


            svg.append("text")
                .attr("id", "behaviour907")
                .attr("x", 725)
                .attr("opacity", "0")
                .attr("y", 500)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1998");




            var arrayincidents = [464, 571, 657, 667, 713, 752, 865, 907, 941, 1065, 1095, 626];

            svg.append("text")
                .attr("id", "behaviour941")
                .attr("x", 818)
                .attr("opacity", "0")
                .attr("y", 464)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("1999");


            svg.append("text")
                .attr("id", "behaviour1065")
                .attr("x", 910)
                .attr("opacity", "0")
                .attr("y", 340)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("2000");



            svg.append("text")
                .attr("id", "behaviour1095")
                .attr("x", 1000)
                .attr("opacity", "0")
                .attr("y", 310)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("2001");



            svg.append("text")
                .attr("id", "behaviour626")
                .attr("x", 1090)
                .attr("opacity", "0")
                .attr("y", 780)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .text("2002");

        }

        line(distinct);

        //hierarchy

        //console.log(data);






        //console.log(distinct);
        //bar chart

        const svg = d3.select("#svg2")
            .attr('height', height - margin.top - margin.bottom)
            .attr('width', width - margin.left - margin.right)
            .attr('viewBox', [250, 0, width, height + 280]);

        let maxdate = Math.max(...dates);



        const x = d3.scaleBand()
            .domain(distinct.year)
            .range([0, width + 200])
            .padding(0);


        const y = d3.scaleLinear()
            .domain([0, 1200])
            .range([height, margin.top - 300]);

        var g = svg.append("g")
            .attr("transform", "translate(" + 200 + "," + 200 + ")");


        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("id", "xaxis")
            .call(d3.axisBottom(x).tickFormat(function (d) {
                return d;
            })
            );

        svg.select("#xaxis")
            .attr("transform", "translate(0," + height + ")")

        g.append("g")
            .call(d3.axisLeft(y).tickFormat(function (d) {
                return d;
            }).ticks(10));


        const array2 = [];
        i = 0;
        distinct.incidents.forEach(function (d) {
            array2.push(distinct.incidents[i]);
            i++;
        })

        g.append("g")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -550)
            .attr("font-size", "32px")
            .attr("y", -50)
            .attr("stroke", "black")
            .text("Number of Incidents")

        g.append("g")
            .append("text")
            .attr("x", 400)
            .attr("font-size", "32px")
            .attr("y", 1050)
            .attr("stroke", "black")
            .text("Year")

        var b = 260
        var a = -60




        g.selectAll(".bar")
            .data(distinct.incidents, function (d) { return d; })
            .enter().append("rect")
            .attr("class", "bar")
            .on("click", onClick)
            .attr("x", function (d, i) { return x(d, i); })
            .attr("y", function (d) { return y(d); })
            .attr("width", x.bandwidth() - 4)
            .attr("height", function (d) { return height - y(d); })
            .attr("transform", function (d, i) {
                var translate = [x.bandwidth() * i, 0];
                return "translate(" + translate + ")"
            });


        function onClick(d, i) {

            var xcoord = 1020;
            var ycoord = 150;

            var arrayincidents = [464, 571, 657, 677, 667, 713, 752, 865, 907, 941, 1065, 1095, 626];
            d3.select('#bardetails').classed('hidden', false);
            d3.select('#bardetails')
                .style('left', xcoord + 'px')
                .style('top', ycoord + 'px')
                .select('#value').text(function (d, j) { return distinct.incidents, i })

            d3.select(this)
            {

                if (d3.select(this).attr('class') == 'highlight') {
                    d3.select(this).attr('class', 'bar')
                    var behavior_rn = "#behaviour" + i;
                    d3.select(behavior_rn)
                        .attr("opacity", "0")
                    d3.select('#bardetails').classed('hidden', true);
                }
                else if (d3.select(this).attr('class') == 'bar') {
                    d3.select(this).attr('class', 'highlight')
                    var behavior_rn = "#behaviour" + i;
                    d3.select(behavior_rn)
                        .attr("opacity", "1")

                }

            }



        }


        function onMouseOut(d, i) {
            // use the text label class to remove label on mouseout
            d3.select(this).attr('class', 'bar');
            d3.select(this)
            {
                var behavior_rn = "#behaviour" + i;
                console.log(behavior_rn);
                d3.select(behavior_rn)
                    .attr("opacity", "0")

            }

            d3.select("#bardetails").classed('hidden', true);
        }

        d3.select("#svg3").append("path")
            .datum(distinct)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
                .x(function (d) {
                    xline = xline + 100
                    return xline;
                })
                .y(function (d) {
                    return xline;
                }))





    });



    d3.csv("birdstrikes.csv").then(function (data) {
        var width = 1200;
        var height = 1200;

        var svg = d3.select("#svg3");
        d3.select("#svg3")
            .attr('viewBox', [0, 0, 100, 500]);


        var g = svg.append("g").attr('transform', 'translate(800, 0)');
        var hierarchyvars = d3.nest()
            .key(function (d) { return d.Order; })
            .key(function (d) { return d["Origin State"]; })
            .key(function (d) { return d["Airport Name"] })
            .key(function (d) { return d["Aircraft Make Model"]; })
            .entries(data);



        console.log(hierarchyvars[0].values);

        var root = d3.hierarchy(hierarchyvars[0], function (d) { return d.values; })
        var treemap = d3.tree().size([10000, 1200]);
        treemap(root);



        var link = g.selectAll(".links")

            .data(root.links())
            .join("line")
            .attr('x1', function (d) { if (d.source.depth <= 2) return d.source.x; })
            .attr('y1', function (d) { if (d.source.depth <= 2) return d.source.y; })
            .attr('x2', function (d) { if (d.source.depth <= 2) return d.target.x; })
            .attr('y2', function (d) { if (d.source.depth <= 2) return d.target.y; });

        var nodes = g.selectAll('circle')
            .data(root.descendants())
            .enter().append('circle')
            .on("mouseover", onmouseovertree)
            .on("mouseout", onmouseouttree)
            .attr('cx', function (d) { if (d.depth <= 3) return d.x; })
            .attr('cy', function (d) { if (d.depth <= 3) return d.y; })
            .attr('r', 8)


            d3.select("#svg3").append("text").attr('id', 'treedetails');

        g.selectAll('text.label')
            .data(root.descendants())
            .join('text')
            .classed('label', true)
            .attr('x', function (d) { if(d.depth<=2) return d.x; })
            .attr('y', function (d) { if(d.depth<=2) return d.y - 10; })
            .text(function (d) {
                return d.data.key;
            });

        let labelText2 = svg.append("text").attr("x", 0).attr("y", 40);

        function onmouseovertree(d, i)
        {
            console.log(i.data.key);


            d3.select(this)
            {
                d3.select(this).attr('fill', 'red')
                d3.select("#treedetails")
                .text(i.data.key)
                .attr('font-size', '4px')
                .attr('x', -100)
                .attr('y', 200)
                .style("display", "block");
            }
        }

        function onmouseouttree(d)
        {
            d3.select(this)
            {
                d3.select(this).attr('fill', 'black')
            }
            d3.select("#treedetails").style("display", "none");

        }

        let zoom = d3.zoom().on('zoom', zoomFunction);

        function zoomFunction(z) {
            g.attr('transform', z.transform);
        }

        function initzoom(z) {
            svg.call(zoom);
        }
        initzoom();





    })

    //Timrline
    /*function loaddata()
    {
        var timeline = [];
        d3.csv("birdstrikes.csv").then(function(data)
        {
        
            var count = 0;
            data.forEach(function(d)
            {
                const [day, month, year] = d["Flight Date"]
                .split("/").slice();
    
                const date = new Date(year, month, 0);
                timeline[count] = date;
                timeline[count] = timeline[count].getFullYear();
                count++;
            })

            const svg = d3.select("#svg5")
            .attr('height', height - margin.top - margin.bottom)
            .attr('width', width - margin.left - margin.right)
            .attr('viewBox', [250, 0, width, height + 280]);

        let maxdate = Math.max(...dates);



        const x = d3.scaleBand()
            .domain(distinct.year)
            .range([0, width + 200])
            .padding(0);


        const y = d3.scaleLinear()
            .domain([0, 1200])
            .range([height, margin.top - 300]);

        var g = svg.append("g")
            .attr("transform", "translate(" + 200 + "," + 200 + ")");


        g.append("text")
            .attr("x", ((width / 2)))
            .attr("y", -50)
            .style("font-size", "50px")
            .text("Timeline Visualisation");

        g.append("text")
            .attr("x", ((width / 2)))
            .attr("y", -0)
            .attr("text-anchor", "middle")
            .style("font-size", "32px")
            .text("Number of birdstrikes per year");

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("id", "xaxis")
            .call(d3.axisBottom(x).tickFormat(function (d) {
                return d;
            })
            );

        svg.select("#xaxis")
            .attr("transform", "translate(0," + height + ")")

        g.append("g")
            .call(d3.axisLeft(y).tickFormat(function (d) {
                return d;
            }).ticks(10));


        const array2 = [];
        i = 0;
        distinct.incidents.forEach(function (d) {
            array2.push(distinct.incidents[i]);
            i++;
        })

        g.append("g")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -550)
            .attr("font-size", "32px")
            .attr("y", -50)
            .attr("stroke", "black")
            .text("Number of Incidents")

        g.append("g")
            .append("text")
            .attr("x", 400)
            .attr("font-size", "32px")
            .attr("y", 1050)
            .attr("stroke", "black")
            .text("Year")

        var b = 260
        var a = -60




        g.selectAll(".bar")
            .data(distinct.incidents, function (d) { return d; })
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d, i) { return x(d, i); })
            .attr("y", function (d) { return y(d); })
            .attr("width", x.bandwidth() - 4)
            .attr("height", function (d) { return height - y(d); })
            .attr("transform", function (d, i) {
                var translate = [x.bandwidth() * i, 0];
                return "translate(" + translate + ")"
            });



                */


            /*const x = d3.scaleBand()
            .domain(distinct.year)
            .range([0, width + 200])
            .padding(0);


        const y = d3.scaleLinear()
            .domain([0, 1200])
            .range([height, 10000]);

            var g = svg.select("#svg5").append("g");

            g.append("g")
                .attr("id", "xaxis")
                .call(d3.axisBottom(x));



            g.append("g")
                .call(d3.axisLeft(y));

            console.log(timeline)
            /*.sortKeys(d3.ascending)
            .rollup(function(leaves)
            {
                return {
                    sum: d3.sum(leaves, (d) => {
                        return 1;
                    }),
                };
            })*/

            
            
}

var padding = {top:20, right:40, bottom:0, left:0},
            w = 600 - padding.left - padding.right,
            h = 600 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 13,
            oldpick = [],
            turn = false;
            color = d3.scale.category20();//category20c()
            //randomNumbers = getRandomNumbers();
        //http://osric.com/bingo-card-generator/?title=HTML+and+CSS+BINGO!&words=padding%2Cfont-family%2Ccolor%2Cfont-weight%2Cfont-size%2Cbackground-color%2Cnesting%2Cbottom%2Csans-serif%2Cperiod%2Cpound+sign%2C%EF%B9%A4body%EF%B9%A5%2C%EF%B9%A4ul%EF%B9%A5%2C%EF%B9%A4h1%EF%B9%A5%2Cmargin%2C%3C++%3E%2C{+}%2C%EF%B9%A4p%EF%B9%A5%2C%EF%B9%A4!DOCTYPE+html%EF%B9%A5%2C%EF%B9%A4head%EF%B9%A5%2Ccolon%2C%EF%B9%A4style%EF%B9%A5%2C.html%2CHTML%2CCSS%2CJavaScript%2Cborder&freespace=true&freespaceValue=Web+Design+Master&freespaceRandom=false&width=5&height=5&number=35#results
        var data = [
                    {"label":"Bruno",  "value":1,  "question":"Bruno", "pic":"Alunos_data/Bruno.jpeg"}, // padding
                    {"label":"Caio",  "value":2,  "question":"Caio", "pic":"Alunos_data/Caio.jpeg"}, //font-family
                    {"label":"Leonor",  "value":3,  "question":"Leonor", "pic":"Alunos_data/Leonor.png"}, //color
                    {"label":"Marta",  "value":4,  "question":"Marta", "pic":"Alunos_data/Marta.jpeg"}, //font-weight
                    {"label":"Milena",  "value":5,  "question":"Milena", "pic":"Alunos_data/Milena.jpeg"}, //font-size
                    {"label":"Pedro",  "value":6,  "question":"Pedro", "pic":"Alunos_data/Pedro.png"}, //background-color
                    {"label":"Ricardo",  "value":7,  "question":"Ricardo", "pic":"Alunos_data/Ricardo.jpeg"}, //nesting
                    {"label":"Rui",  "value":8,  "question":"Rui", "pic":"Alunos_data/Rui.png"}, //bottom
                    {"label":"Sanaz",  "value":9,  "question":"Sanaz", "pic":"Alunos_data/Sanaz.jpeg"}, //sans-serif
                    {"label":"Thiago", "value":10, "question":"Thiago", "pic":"Alunos_data/Thiago.jpeg"},
                    {"label":"Vasco", "value":11, "question":"Vasco", "pic":"Alunos_data/Vasco.png"},
                    {"label":"Veronika", "value":12, "question":"Veronika", "pic":"Alunos_data/Veronika.jpeg"},
                    {"label":"Abdul", "value":13, "question":"Abdul", "pic":"Alunos_data/Abdul.png"},
                ];
                var svg = d3.select('#chart')
                    .append("svg")
                    .data([data])
                    .attr("width",  w + padding.left + padding.right)
                    .attr("height", h + padding.top + padding.bottom);
                var container = svg.append("g")
                    .attr("class", "chartholder")
                    .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");
                var vis = container
                    .append("g");
                    
                var pie = d3.layout.pie().sort(null).value(function(d){return 1;});
                // declare an arc generator function
                var arc = d3.svg.arc().outerRadius(r);
                // select paths, use arc generator to draw
                var arcs = vis.selectAll("g.slice")
                    .data(pie)
                    .enter()
                    .append("g")
                    .attr("class", "slice");
                    
                arcs.append("path")
                    .attr("fill", function(d, i){ return color(i); })
                    .attr("d", function (d) { return arc(d); });
                // add the text
                arcs.append("text").attr("transform", function(d){
                        d.innerRadius = 0;
                        d.outerRadius = r;
                        d.angle = (d.startAngle + d.endAngle)/2;
                        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
                    })
                    .attr("text-anchor", "end")
                    .text( function(d, i) {
                        return data[i].label;
                    });
                container.on("click", spin);
                function spin(d){
                    turn = true;
                    container.on("click", null);
                    //all slices have been seen, all done
                    /* console.log("OldPick: " + oldpick.length, "Data length: " + data.length); */
                    if(oldpick.length == data.length){
                        console.log("done");
                        container.on("click", null);
                        return;
                    }
                    song.play();
                    var  ps       = 360/data.length,
                         pieslice = Math.round(1440/data.length),
                         /* Velocidade rng */
                         rng      = Math.floor((Math.random() * 2880) + 360);
                         
                    /* VELOCIDADE DA ROTACAO */
                    rotation = (Math.round(rng / ps) * ps * 2);
                    
                    picked = Math.round(data.length - (rotation % 360)/ps);
                    picked = picked >= data.length ? (picked % data.length) : picked;
                    if(oldpick.indexOf(picked) !== -1){
                        d3.select(this).call(spin);
                        return;
                    } else {
                        oldpick.push(picked)
                    }            
                    rotation += 90 - Math.round(ps/2);
                    vis.transition()
                    /* DURACAO DO TEMPO DELA RODANDO */
                        .duration(7500)
                        .attrTween("transform", rotTween)
                        .each("end", function(){
                            //mark question as seen
                            d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                                .attr("fill", "#111");
                            //populate question
                            d3.select("#question h1")
                                .text(data[picked].question);
                            d3.select("#pic img")
                            .attr("src",data[picked].pic);
                            oldrotation = rotation;
                            /* Get the result value from object "data" */
                            console.log(data[picked].label)
                            console.log([picked])
                            console.log(data[picked].pic)
                            turn = false;
                            console.log(turn);
                            /* Comment the below line for restrict spin to sngle time */
                            container.on("click", spin);
                        })
                }
                //make arrow
                svg.append("g")
                .attr("transform", "translate(" + (w + 200) + "," + ((h/2)+padding.top) + ")")
                .append("path")
                .attr("d", "M-" + (r*.80) + ",0L0," + (r*.4) + "L0,-" + (r*.4) + "Z")
                    .style({"fill":"red"});
                //draw spin circle
                /* container.append("circle")
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r", 60)
                    .style({"fill":"white","cursor":"pointer"}); */
                container.append("image")
                    .attr("xlink:href", "ironhackpt-removebg-preview.png")
                    .attr("x", -110)
                    .attr("y", -110)
                    .attr("width", 225)
                    .attr("height", 225)
                    .style({"cursor":"pointer"});
                //spin text
                /* container.append("text")
                    .attr("x", 0)
                    .attr("y", 15)
                    .attr("text-anchor", "middle")
                    .text("SPIN")
                    .style({"font-weight":"bold", "font-size":"30px"}); */
                
                
                function rotTween(to) {
                  var i = d3.interpolate(oldrotation % 360, rotation);
                  return function(t) {
                    return "rotate(" + i(t) + ")";
                  };
                }
        
                function getRandomNumbers(){
                    var array = new Uint16Array(1000);
                    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
                    if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                        window.crypto.getRandomValues(array);
                        console.log("works");
                    } else {
                        //no support for crypto, get crappy random numbers
                        for(var i=0; i < 1000; i++){
                            array[i] = Math.floor(Math.random() * 100000) + 1;
                        }
                    }
                    return array;
                }
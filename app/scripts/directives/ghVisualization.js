angularD3App.directive('graph', function () {
    var width = 500,
        height = 100,
        isInitialized = false,
        vis = "",
        g = "";

    return {
        restrict:'E',//based on Element, A = based on Attribute

        link:function (scope, element, attr) {
            // set up initial svg object
            vis = d3.selectAll(element)
                .append("svg")
                .attr("viewBox", "-10 -10 500 110")
                .attr("width", width)
                .attr("height", height + 20)

            g = vis.selectAll('adding graphics element')
                .data([{x:0, y:0}])
                .enter()
                .append('g');

            var init = function (value) {
                g.selectAll('add circle elements')
                    .data(value).enter()
                    .append("circle")
                    .attr("class", "points")
                    .attr("r", 6)
                    .attr("cx", function (d, i) {
                        return i * 50;
                    })
                    .attr("cy", function (d) {
                        return d.v;
                    });

                isInitialized = true;

                // drag behavior of each circle in d3
                var dragfn = d3.behavior.drag()
                    .on('dragstart', function () {
                        var sel = d3.select(this),
                            cx = sel.attr('cx'),
                            cy = sel.attr('cy');

                        var cursorData = d3.select(this).data();
                        var clonedData = scope.cloneObj(cursorData);
                        g.selectAll('add drag memory')
                            .data(clonedData).enter()
                            .append('circle')
                            .classed('drag', true)
                            .attr('cx', cx)
                            .attr('cy', cy)
                            .attr('r', 3)
                            .attr('stroke', "black")
                            .attr('fill', "red");
                    })
                    .on('drag', function (d, i) {
                        var sel = d3.select('.drag'),
                            cy = sel.attr('cy');
                        sel.attr('cy', parseInt(cy) + d3.event.dy);
                        d.v = height - Math.round(cy);
                        scope.$apply();
                    })
                    .on('dragend', function (d, i) {
                        var drag = d3.selectAll('.drag');
                        drag.remove();
                    });

                g.selectAll('.points').call(dragfn)
            }
            //setup binding & watch for changes to model properties
            scope.$watch(attr.ghBind, function (value) {
                var changeFn = function () {
                    vis.selectAll(".points")
                        .data(value)
                        .attr("cy", function (d) {
                            return height - d.v;
                        });
                };
                if (isInitialized) {
                    changeFn();
                } else {
                    init(value);
                    changeFn();
                }
            }, true);

        }
    }
});
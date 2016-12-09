//http://codepen.io/flatsteve/pen/QwLYja
//<percentage-circle value="vm.circleAmount"></percentage-circle>
//<input type="number" ng-model="vm.circleAmount" min="0" max="100"/>
//</div>

function percentageCircle() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            value: '='
        },
        template: ' <div class="c100 p{{value}} big blue">' +
                  '     <span>{{value}}%</span>' +
                  '     <div class="slice">' +
                  '         <div class="bar"></div>' +
                  '         <div class="fill"></div>' +
                  '     </div>' +
                  ' </div>'
    };
};

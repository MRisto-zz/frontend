autoSim.StateMenus = function ($scope) {

    var self = this;

    self.edit = {};
    self.edit.isOpen = false;
    self.edit.state = null;
    self.edit.watcher = [];

    self.edit.openHandler = function () {
        if ($scope.states.isInCreation) {
            $scope.statediagram.svgOuter.on("mousemove", null);
            $scope.states.isInCreation = false;
            $scope.saveApply();
        }
        $scope.states.menu.edit.open($scope.states.getById(parseInt(d3.select(this).attr("object-id"))));
    };

    self.edit.open = function (state) {
        $scope.core.closeMenus();
        if (d3.event !== null && d3.event.stopPropagation !== undefined) {
            d3.event.stopPropagation();
        }
        $scope.states.selected = state;
        self.edit.state = _.cloneDeep(state);

        self.edit.watcher.push($scope.$watch('states.menu.edit.state.name', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                if (newValue !== "" && newValue != undefined && !$scope.states.existsWithName(newValue, self.edit.state.id)) {
                    !$scope.states.rename($scope.states.selected, newValue);
                }
            }
        }));
        self.edit.isOpen = true;

        $scope.saveApply();
    };

    self.edit.close = function () {
        _.forEach(self.edit.watcher, function (value) {
            value();
        });
        self.edit.watcher = [];
        self.edit.state = null;
        if (!$scope.states.isInCreation) {
            $scope.states.selected = null;
        }
        self.edit.isOpen = false;
        $scope.saveApply();
    };

    self.context = {};
    self.context.isOpen = false;
    self.context.position = {};

    self.context.openHandler = function () {
        self.edit.close();
        event.preventDefault();
        self.context.open($scope.states.getById(parseInt(d3.select(this).attr("object-id"))));

    };

    self.context.open = function (state) {
        $scope.core.closeMenus();
        if (d3.event !== null && d3.event.stopPropagation !== undefined)
            d3.event.stopPropagation();

        $scope.states.selected = state;
        self.context.position.x = event.pageX;
        self.context.position.y = event.pageY;
        self.context.isOpen = true;
        $scope.saveApply();
    };

    self.context.close = function (dontRemoveSelectedState) {
        self.context.position = {};
        if (dontRemoveSelectedState !== true && !$scope.states.isInCreation)
            $scope.states.selected = null;
        self.context.isOpen = false;
        $scope.saveApply();
    };


    self.close = function () {
        self.context.close();
        self.edit.close();
    };

    self.isOpen = function () {
        return self.edit.isOpen || self.context.isOpen;
    }

};
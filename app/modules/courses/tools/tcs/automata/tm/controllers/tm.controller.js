(function () {
    'use strict';

    function _initAutomaton($scope) {
        window.rootScope = $scope;
        $scope.saveApply = scopeSaveApply;
        $scope.debug = true;

        // Config Object
                $scope.automatonData = new autoSim.AutomatonData('TM');
                $scope.core = new autoSim.DFACore($scope);
                $scope.states = new autoSim.States($scope);
                $scope.states.menu = new autoSim.StateMenus($scope);
                $scope.transitions = new autoSim.TransitionsTM($scope);
                $scope.transitions.menu = new autoSim.TransitionMenusTM($scope);
                $scope.simulator = new autoSim.SimulatorTM($scope);
                $scope.table = new autoSim.TableTM($scope);
                $scope.statediagram = new autoSim.StateDiagram($scope);
                $scope.statediagram.grid = new autoSim.StateDiagramGrid($scope);
                $scope.statediagram.menu = new autoSim.StateDiagramMenu($scope);
                $scope.statediagram.zoom = new autoSim.StateDiagramZoom($scope);

                $scope.testAgent = new TestData($scope);
    }

    angular
        .module('courses.tcs')
        .controller('TMCtrl', TMCtrl);

    TMCtrl.$inject = ['$scope','$uibModal'];

    function TMCtrl($scope,$uibModal) {
        _initAutomaton($scope);
        $scope.$uibModal = $uibModal;
    }
  }());

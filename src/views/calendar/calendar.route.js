/**
 * This is the main route :)
 */

function calendar ($stateProvider) {
  $stateProvider.state('calendar', {
    url: '/calendar',
    templateUrl: 'calendar/calendar.html',
    controller: 'CalendarController'
  });

}

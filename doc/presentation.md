# Finishing Events

 * Each event should only be marked "completed" once a person is confident that nothing else needs to be done for it
 * An event should not be allowed to be marked completed unless all teams have some sort of score/scoring code
 * If an event needs to be changed after being marked completed, it should have to be marked not completed first
   * If presentation of the event has started/completed, a warning that the event will have to be re-presented should be made before marking non-complete
   * Upon marking the event completed again, the user should be asked if it should be re-presented

# Presenting Events

 * Users should be able to specify the order(s) they want to present the events (alphabetical, division)
   * This should include primary/secondary ordering
 * When an event begins presentation, it should be marked as presented in the database
   * While presenting, the presentation slide should be shown in a different window than the dashboard for managing the presentation
   * The management slide should show:
 * A small copy of the presentation window
   * A list of the events for each division along with their statuses and whether or not they've been presented
   * Options to mark each event that has been presented as not presented, or all of them as not presented
   * An indicator for which event is coming up next
   * Should ideally update in realtime (web socket)

# Concurrent Modification

 * Whenever a user starts editing an event, they should get a "lock" on that event. (parameter?)
   * Could be accomplished by generating and sending a hash code
 * If another user wants to edit, they should get a warning that someone else is editing it. If they choose to override, they receive the lock and the other user loses it
 * Modification should probably be managed by a websocket, rather than batch save operations.

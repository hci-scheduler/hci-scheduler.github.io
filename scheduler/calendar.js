$(function () {
    var events = [
    {
        title: 'Test Event',
        date: '2015-11-12'
    }
    ];


    //TODO: handling course addition
    $('#add').click(function() {
        ev = {
            title: 'asda',
            date: '2015-11-13',
            stick: true
        };
        $('#calendar').fullCalendar('renderEvent', ev);
    });

    //TODO: handling class addition

	$('#calendar').fullCalendar({
        editable: true,
        eventLimit: true,
        events: events
	});
});
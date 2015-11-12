$(function () {
    var events = [
    {
        title: 'Test Event',
        date: '2015-11-12'
    }
    ];

    $('#add').click(function() {
        ev = {
            title: 'asda',
            date: '2015-11-13',
            stick: true
        };
        $('#calendar').fullCalendar('renderEvent', ev);
    });

	$('#calendar').fullCalendar({
        editable: true,
        eventLimit: true,
        events: events
	});
});
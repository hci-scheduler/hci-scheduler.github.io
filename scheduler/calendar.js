$(function () {
    var events = [
    {
        title: 'Test Event',
        date: '2015-11-12'
    }
    ];


    //TODO: handling course addition
    $('#classSubmit').click(function() {
        ev = {
            title: $('#courseNameInput').val(),
            date: '2015-11-13',
            stick: true
        };
        $('#calendar').fullCalendar('renderEvent', ev);
    });

    //TODO: handling class addition
    $('#assignSubmit').click(function() {
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
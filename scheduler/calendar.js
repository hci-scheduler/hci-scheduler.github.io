$(function () {
    var events = [
    ];


    //TODO: limit course to start -> end date
    $('#classSubmit').click(function() {
        var dayArray = new Array();
        var courseName = $('#courseNameInput').val();
        var startTime = $('#startTimeHourSelect').val() + ':' +$('#startTimeMinuteSelect').val();
        var endTime = $('#endTimeHourSelect').val() + ':' + $('#endTimeMinuteSelect').val();
        var startDate = $('#startDatePicker').val();
        var endDate = $('#endDatePicker').val();

        if($('#mondayCheckbox').is(':checked')) {
            dayArray.push(1);
        }
        if($('#tuesdayCheckbox').is(':checked')) {
            dayArray.push(2);
        }

        if($('#wednesdayCheckbox').is(':checked')) {
            dayArray.push(3);
        }

        if($('#thursdayCheckbox').is(':checked')) {
            dayArray.push(4);
        }

        if($('#fridayCheckbox').is(':checked')) {
            dayArray.push(5);
        }

            ev = {
            id: courseName,
            title: courseName,
            start: startTime,
            end: endTime,
            dow: dayArray,
            color: 'red',
            //ranges: [{
            //    start: moment(startDate, 'YYYY-MM-DD'),
            //    end: moment(endDate, 'YYYY-MM-DD')
            //}],
            campusLoc: $('#locationInput').val(),
            professor: $('#professorInput').val(),
            professorEmail: $('#professorEmailInput').val(),
            website: $('#classWebsiteInput').val(),
            description: $('#courseDescriptionTextArea')

        };
        $('#courseSelect').append('<option value=' + courseName +'>' + courseName + '</option>');
        $('#calendar').fullCalendar('renderEvent', ev);

    });

    //TODO: handling class addition
    $('#assignSubmit').click(function() {
        assignmentName = $('#assignmentNameInput').val();

        dueDate = $('#dueDatePicker').val() + 'T' + $('#timeDueHourInput').val() + ':' + $('#timeDueMinuteInput').val() + ':00';
        console.log(dueDate);

        ev = {
            id: assignmentName,
            title: assignmentName,
            start: dueDate,
            color: 'blue',
            stick: true
        };

        console.log(ev);

        $('#calendar').fullCalendar('renderEvent', ev);

    });

	$('#calendar').fullCalendar({
        editable: true,
        eventLimit: true,
        events: events
	});
});
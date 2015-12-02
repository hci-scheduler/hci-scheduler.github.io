var events = [];

$(function () {
    $('#startDatePicker').datepicker({
		todayHighlight: true
	});
	$('#endDatePicker').datepicker({
		todayHighlight: true
	});
	$('#dueDatePicker').datepicker({
		format: 'yyyy-mm-dd',
		todayHighlight: true
	});
	$('#reminderDatePicker').datepicker({
		format: 'yyyy-mm-dd',
		todayHighlight: true
	});

	$('#calendar').fullCalendar({
        editable: true,
        eventLimit: true,
        events: events
	});
});

//TODO: limit course to start -> end date
$('#classSubmit').on('click', function() {
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
    
    var ev = {
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
    resetClassModal();
});

//TODO: handling class addition
$('#assignSubmit').on('click', function() {
    var assignmentName = $('#assignmentNameInput').val();

    var dueDate = $('#dueDatePicker').val() + 'T' + $('#timeDueHourInput').val() + ':' + $('#timeDueMinuteInput').val() + ':00';
    console.log(dueDate);

    var ev = {
        id: assignmentName,
        title: assignmentName,
        start: dueDate,
        color: 'blue',
        stick: true
    };

    console.log(ev);

    $('#calendar').fullCalendar('renderEvent', ev);
    resetAssignmentModal();
});

$('#classButton').on('click', function () {
	$('#classModal').modal();
});

$('#assignmentButton').on('click', function () {
	$('#assignmentModal').modal();
});

$('#classSubmit').on('click', function () {
	$('#classModal').modal('hide');
});

$('#assignSubmit').on('click', function () {
	$('#assignmentModal').modal('hide');
});

function resetClassModal() {
	$('#courseNameInput').val('');
	$('#startTimeHourSelect').val('0');
	$('#startTimeMinuteSelect').val('00');
	$('#startAmRadio').prop('checked', false);
	$('#startPmRadio').prop('checked', false);
	$('#endTimeHourSelect').val('0');
	$('#endTimeMinuteSelect').val('00');
	$('#endAmRadio').prop('checked', false);
	$('#endPmRadio').prop('checked', false);
	$('#mondayCheckbox').prop('checked', false);
	$('#tuesdayCheckbox').prop('checked', false);
	$('#wednesdayCheckbox').prop('checked', false);
	$('#thursdayCheckbox').prop('checked', false);
	$('#fridayCheckbox').prop('checked', false);
	$('#saturdayCheckbox').prop('checked', false);
	$('#sundayCheckbox').prop('checked', false);
	$('#startDatePicker').val('');
	$('#endDatePicker').val('');
	$('#locationInput').val('');
	$('#professorInput').val('');
	$('#professorEmailInput').val('');
	$('#classWebsiteInput').val('');
	$('#courseDescriptionTextArea').val('');
}

function resetAssignmentModal() {
	$('#courseSelect').val('');
	$('#assignmentNameInput').val('');
	$('#dueDatePicker').val('');
	$('#timeDueHourInput').val('');
	$('#timeDueMinuteInput').val('');
	$('#timeDueAmRadio').prop('checked', false);
	$('#timeDuePmRadio').prop('checked', false);
	$('#assignmentDetailsTextArea').val('');
	$('#reminderDatePicker').val('');
	$('#reminderHourSelect').val('0');
	$('#reminderMinuteSelect').val('00');
	$('#reminderAmRadio').prop('checked', false);
	$('#reminderPmRadio').prop('checked', false);
}
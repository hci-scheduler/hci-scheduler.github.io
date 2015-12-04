var dateFormatString = 'MM/DD/YYYY h:mm a';
var events = [];

$(function () {
    $('#startDatePicker').datepicker({
		todayHighlight: true
	});
	$('#endDatePicker').datepicker({
		todayHighlight: true
	});
	$('#dueDatePicker').datepicker({
		todayHighlight: true
	});
	$('#reminderDatePicker').datepicker({
		todayHighlight: true
	});

	$('#calendar').fullCalendar({
        eventLimit: true,
        events: events
	});
});

//TODO: limit course to start -> end date
$('#classSubmit').on('click', function() {
    var classEvents = [];
    var dayArray = new Array();
    var courseName = $('#courseNameInput').val();
    var startTime = $('#startTimeHourSelect').val() + ':' + $('#startTimeMinuteSelect').val();
    var startAm = $('#startAmRadio').prop('checked');
    var startPm = $('#startPmRadio').prop('checked');
    if (!startAm && !startPm) {
        alert('You must select am or pm for your start time.');
        return;
    }
    else {
        if (startAm) {
            startTime += ' am'
        }
        else if (startPm) {
            startTime += ' pm';
        }
    }
    var endTime = $('#endTimeHourSelect').val() + ':' + $('#endTimeMinuteSelect').val();
    var endAm = $('#endAmRadio').prop('checked');
    var endPm = $('#endPmRadio').prop('checked');
    if (!endAm && !endPm) {
        alert('You must select am or pm for your end time.');
        return;
    }
    else {
        if (endAm) {
            endTime += ' am'
        }
        else if (endPm) {
            endTime += ' pm';
        }
    }
    var startDate = $('#startDatePicker').val();
    var endDate = $('#endDatePicker').val();
    
    var startMoment = moment(startDate + ' ' + startTime, dateFormatString);
    var endMoment = moment(endDate + ' ' + endTime, dateFormatString);

    if ($('#sundayCheckbox').is(':checked')) {
        dayArray.push(0);
    }
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
    if ($('#saturdayCheckbox').is(':checked')) {
        dayArray.push(6);
    }
    
    if (dayArray.length == 0) {
        for (var i = 0; i < 2; i++) {
            var tmpStart = '';
            var tmpEnd = '';
            if (i == 0) {
                tmpStart = moment(startDate + ' ' + startTime, dateFormatString).format();
                tmpEnd = moment(startDate + ' ' + endTime, dateFormatString).format();
            }
            else if (i == 1) {
                tmpStart = moment(endDate + ' ' + startTime, dateFormatString).format();
                tmpEnd = moment(endDate + ' ' + endTime, dateFormatString).format();
            }
            var ev = {
                id: courseName,
                title: courseName,
                start: tmpStart,
                end: tmpEnd,
                campusLoc: $('#locationInput').val(),
                professor: $('#professorInput').val(),
                professorEmail: $('#professorEmailInput').val(),
                website: $('#classWebsiteInput').val(),
                description: $('#courseDescriptionTextArea').val(),
                editable: false
            };
            classEvents.push(ev);
        }
    }
    else {
        var startingDate = moment(startDate + ' ' + startTime, dateFormatString);
        var oldDate = moment(startingDate);
        startingDate.day(dayArray[0]);
        for (var i = 0; i < dayArray.length; i++) {
            if (startingDate.isAfter(endMoment)) {
                continue;
            }
            var convertedEndTime = convertTimeStandard(endTime);
            var parts = convertedEndTime.split(':');
            var tmpDate = moment(startingDate);
            do {
                if (tmpDate.isAfter(startMoment)) {
                    var ev = {
                        id: courseName,
                        title: courseName,
                        start: tmpDate.format(),
                        end: moment(tmpDate).hour(parts[0]).minute(parts[1]).format(),
                        campusLoc: $('#locationInput').val(),
                        professor: $('#professorInput').val(),
                        professorEmail: $('#professorEmailInput').val(),
                        website: $('#classWebsiteInput').val(),
                        description: $('#courseDescriptionTextArea').val(),
                        editable: false
                    };
                    classEvents.push(ev);
                }
                tmpDate.date(tmpDate.date() + 7);
            }
            while (tmpDate.isBefore(endMoment));
            if (i < dayArray.length - 1) {
                startingDate = oldDate;
                startingDate.day(dayArray[i + 1]);
            }
        }
    }
    
    var eventObj = {
        events: classEvents,
        color: 'red'
    };
    
    $('#courseSelect').append('<option value=' + courseName +'>' + courseName + '</option>');
    $('#calendar').fullCalendar('addEventSource', eventObj);
    resetClassModal();
});

//TODO: handling class addition
$('#assignSubmit').on('click', function() {
    var assignmentEvents = [];
    var assignmentName = $('#assignmentNameInput').val();
    var timeDue = $('#timeDueHourSelect').val() + ':' + $('#timeDueMinuteSelect').val();
    var dueAm = $('#timeDueAmRadio').prop('checked');
    var duePm = $('#timeDuePmRadio').prop('checked');
    if (!dueAm && !duePm) {
        alert('You must select am or pm for your time due');
        return;
    }
    else {
        if (dueAm) {
            timeDue += ' am'
        }
        else if (duePm) {
            timeDue += ' pm';
        }
    }
    var dueDate = $('#dueDatePicker').val();
    if (dueDate == '') {
        alert('You must select a due date');
        return;
    }
    
    var reminderDate = $('#reminderDatePicker').val();
    if (reminderDate != '') {
        var reminderTime = $('#reminderHourSelect').val() + ':' + $('#reminderMinuteSelect').val();
        var reminderAm = $('#reminderAmRadio').prop('checked');
        var reminderPm = $('#reminderPmRadio').prop('checked');
        if (!reminderAm && !reminderPm) {
            alert('You have selected a reminder date so you must select am or pm for your reminder time');
            return;
        }
        else {
            if (reminderAm) {
                reminderTime += ' am';
            }
            else if (reminderPm) {
                reminderTime += ' pm';
            }
        }
        var reminderMoment = moment(reminderDate + ' ' + reminderTime, dateFormatString);
        var evReminder = {
            id: assignmentName,
            title: 'Reminder for ' + assignmentName,
            start: reminderMoment.format(),
            end: reminderMoment.format(),
            editable: false
        };
        assignmentEvents.push(evReminder);
    }
    
    var dueMoment = moment(dueDate + ' ' + timeDue, dateFormatString);
    var evDue = {
        id: assignmentName,
        title: assignmentName,
        start: dueMoment.format(),
        end: dueMoment.format(),
        assignmentDetails: $('#assignmentDetailsTextArea').val(),
        editable: false
    };
    assignmentEvents.push(evDue);
    var eventObj = {
        events: assignmentEvents,
        color: 'blue'
    };
    
    $('#calendar').fullCalendar('addEventSource', eventObj);
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
	$('#timeDueHourSelect').val('0');
	$('#timeDueMinuteSelect').val('00');
	$('#timeDueAmRadio').prop('checked', false);
	$('#timeDuePmRadio').prop('checked', false);
	$('#assignmentDetailsTextArea').val('');
	$('#reminderDatePicker').val('');
	$('#reminderHourSelect').val('0');
	$('#reminderMinuteSelect').val('00');
	$('#reminderAmRadio').prop('checked', false);
	$('#reminderPmRadio').prop('checked', false);
}

function convertTimeStandard(str) {
    var parts = str.split(' ');
    var timeParts = parts[0].split(':');
    if (timeParts[0] == '12') {
        timeParts[0] = '0';
    }
    if (parts[1].toLowerCase() == 'pm') {
        timeParts[0] = (parseInt(timeParts[0]) + 12).toString();
    }
    return timeParts[0] + ':' + timeParts[1];
}
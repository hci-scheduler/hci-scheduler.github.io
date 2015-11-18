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
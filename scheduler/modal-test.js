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
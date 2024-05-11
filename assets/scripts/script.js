$(document).ready(function () {
    $("#stream1_btn").on("click", function () {
        $(".stream1").removeClass('highlight_stream');
        $(".stream2").removeClass('highlight_stream');
        $(".stream3").removeClass('highlight_stream');
        $(".stream1").addClass('highlight_stream');
    });
    $("#stream2_btn").on("click", function () {
        $(".stream1").removeClass('highlight_stream');
        $(".stream2").removeClass('highlight_stream');
        $(".stream3").removeClass('highlight_stream');
        $(".stream2").addClass('highlight_stream');
    });
    $("#stream3_btn").on("click", function () {
        $(".stream1").removeClass('highlight_stream');
        $(".stream2").removeClass('highlight_stream');
        $(".stream3").removeClass('highlight_stream');
        $(".stream3").addClass('highlight_stream');
    });
    $("#stream3_btn").mouseleave(function () {
        $(".stream3").slideUp(400);
        $(".stream2").slideDown(400).delay(800);
    });
    $("#stream1_btn").mouseleave(function () {
        $(".stream1").hide('medium');
    });
    $("#stream2_btn").mouseleave(function () {
        $(".stream2").removeClass('highlight_stream');
    });
    $("#stream3_btn").mouseenter(function () {
        $(".stream3").slideDown(400).delay(800);
        $(".stream2").slideUp(400);
    });
    $("#stream2_btn").mouseenter(function () {
        $(".stream2").addClass('highlight_stream');
    });
    $("#stream1_btn").mouseenter(function () {
        $(".stream1").show('slow');
    });

});
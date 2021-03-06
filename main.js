var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches



function validate1() {
	var fname, lname, contact;
	fname = $(".fname").val();
	lname = $(".lname").val();
	contact = $(".contact").val();
	if (fname === '' || lname === '' || contact === '') {
		return false;
	}
	return true;
}

function validate2() {
	var fname, lname, contact;
	twitter = $("#twitter").val();
	fb = $("#fb").val();
	insta = $("#insta").val();
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (twitter !== '1@gmail.com' && fb !== '2@gmail.com' && insta !== '3@gmail.com') {
		return false;
	}
	if ((!filter.test(twitter)) && (!filter.test(fb)) && (!filter.test(fb))) {
		return false;
	}

	return true;
}

function validate3() {
	var email;
	email = $('.email').val();
	if (email === '') {
		return false;
	}
	return true;
}

$(".next1").on("click", function () {
	if (validate1()) {
		$('.active').next().addClass('active');
		$('.f1').hide();
		$('.f2').show();

	}
});

$(".next2").on("click", function () {
	if (validate2()) {
		$('.active').next().addClass('active');
		$('.f1').hide();
		$('.f2').hide();
		$('.f3').show();
	}

});

$(".submit").on("click", function () {
	if (validate3()) {
		$('.previous2').fadeOut(500);
		$('.submit').fadeOut(500);
		$('#notify3').html('Successfully Submitted');
	}

});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
        if($(this).attr('name') == 'previous')
	previous_fs = $('#two');



	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});
$(".submit").click(function(){
	return false;
})


$(".previous").on('click', function(e) {
    e.preventDefault();

    $('form > fieldset').filter(function() {
      return $(this).prop('id') == 'two';
    }).children(':input').each(function() {
      $(this).val(this.defaultValue);
    });

  });

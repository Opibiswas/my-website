$(document).ready(function () {

  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('header').toggleClass('toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('header').removeClass('toggle');

    if ($(window).scrollTop() > 0) {
      $('.top').show();
    } else {
      $('.top').hide();
    }
  });

  // smooth scrolling (SAFE: prevents error if id doesn't exist)
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();

    const target = $(this).attr('href');
    const $targetEl = $(target);

    if ($targetEl.length) {
      $('html, body').animate({
        scrollTop: $targetEl.offset().top,
      }, 500, 'linear');
    }
  });

  // Contact form submit
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    sendEmail();
  });

});


function sendEmail() {
  const name = document.getElementById("nam").value.trim();
  const email = document.getElementById("emaill").value.trim();
  const message = document.getElementById("msg").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return false;
  }

  const submitBtn = document.querySelector('.contact form button');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  Email.send({
    SecureToken: "REPLACE_WITH_NEW_TOKEN_HERE",
    To: 'opibiswas54@gmail.com',
    From: 'opibiswas54@gmail.com',
    Subject: "Portfolio Contact: " + name,
    Body: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>From Email:</strong> ${email}</p> <hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  }).then(function (resp) {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    if (resp === "OK") {
      alert("✅ Message sent successfully!");
      document.getElementById('contactForm').reset();
    } else {
      console.error(resp);
      alert("❌ Error: " + resp);
    }
  });

  return false;
}

$(document).ready(function () {

  // ── Claude-style Sidebar Toggle ──────────────────────────
  $('#sidebar-toggle').click(function () {
    const isOpen = $('header').hasClass('active');

    if (isOpen) {
      $('header').removeClass('active');
      $('body').removeClass('sidebar-open');
      $(this).removeClass('open');
    } else {
      $('header').addClass('active');
      $('body').addClass('sidebar-open');
      $(this).addClass('open');
    }
  });

  // Close when clicking a nav link on mobile
  $('header .navbar ul li a').click(function () {
    if ($(window).width() < 992) {
      $('header').removeClass('active');
      $('body').removeClass('sidebar-open');
      $('#sidebar-toggle').removeClass('open');
    }
  });

  // Close on scroll (mobile only)
  $(window).on('scroll', function () {
    if ($(window).width() < 992) {
      $('header').removeClass('active');
      $('body').removeClass('sidebar-open');
      $('#sidebar-toggle').removeClass('open');
    }
    $('.top').toggle($(window).scrollTop() > 0);
  });

  // ── Smooth Scrolling ──────────────────────────────────────
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    const $target = $($(this).attr('href'));
    if ($target.length) {
      $('html, body').animate({ scrollTop: $target.offset().top }, 500, 'linear');
    }
  });

  // ── Contact Form ──────────────────────────────────────────
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    sendEmail();
  });

}); // ← only ONE closing }); for document.ready


function sendEmail() {
  const name    = document.getElementById("nam").value.trim();
  const email   = document.getElementById("emaill").value.trim();
  const message = document.getElementById("msg").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return;
  }

  const btn = document.querySelector('.contact form button');
  btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
  btn.disabled = true;

  Email.send({
    SecureToken: "REPLACE_WITH_NEW_TOKEN_HERE",
    To:      'opibiswas54@gmail.com',
    From:    'opibiswas54@gmail.com',
    Subject: "Portfolio Contact: " + name,
    Body: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>From Email:</strong> ${email}</p><hr>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  }).then(function (resp) {
    btn.innerHTML = 'send <i class="fas fa-paper-plane"></i>';
    btn.disabled = false;

    if (resp === "OK") {
      alert("✅ Message sent successfully!");
      document.getElementById('contactForm').reset();
    } else {
      alert("❌ Error: " + resp);
    }
  });
}
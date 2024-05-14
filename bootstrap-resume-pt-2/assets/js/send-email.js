/* here is the sample from email.js
emailjs.send("service_f2yi4qd","template_czsxg1a",{
from_name: "Stinky bob",
to_name: "Sean Sean",
message: "Hallo Hallo Hallo winky wank",
reply_to: "asd@asd.asd",
});
*/

function sendEmail(contactForm) {
    emailjs.send("service_f2yi4qd", "template_czsxg1a", {
        from_name: contactForm.name.value,
        from_email: contactForm.emailaddress.value,
        project_request: contactFrom.projectsummary.value,
    }).then(function (response) {
            // it feels like there should be a check of the status code
            // but we don't because then takes care of this
            console.log("SUCCESS", response);
        },
        function (error) {
            console.log("FAILED", error);

        }
    );
}
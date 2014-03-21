/*
    jQuery Mobile Site Builder v1.0
    Author: Sam Deering 2012
    Site: jquery4u.com
*/

(function($,W,D,undefined)
{
    //contact page form validation

        /* FORM VALIDATION
        --------------------------------------------------------------------------------------*/

        var $theForm = $("form#contact");
        $theForm.find(':input').removeAttr('disabled'); //unlock form

        //custom validation rule: plugin picture must be uploaded (chrome bug prevents using required:true)
        $.validator.addMethod("pictureUploaded", function(value, element)
        {
            return (W.JQUERY4U.AJAXIMAGEUPLOAD.cache.data !== undefined);
        });

         //form validation rules
         $theForm.validate({
             rules:
             {
                    name:
                    {
                        required: true,
                        minlength: 3,
                        maxlength: 50
                    },
                    email:
                    {
                        email: true,
                        required: true
                    },
                    message:
                    {
                        required: true,
                        minlength: 10
                    }
             },
             submitHandler: function(form)
             {
                var formData = $theForm.serialize(); //get form data

                $theForm.find('.submit-error').remove(); //clear previous error msgs
                $theForm.find(':input').attr('disabled', 'disabled'); //lock form

                $.ajax(
                {
                    type: "POST",
                    url: 'php/contact.php',
                    dataType: "html",
                    data: formData+'&contact_name='+JQMB.contact_form.name+'&contact_email='+JQMB.contact_form.email,
                    success: function(ret)
                    {
                        console.dir(ret);
                        if(ret == 'true')
                        {
                            alert('Your message was sent.');
                        }
                        else
                        {
                            if (ret == 'false')
                            {
                                alert('Oops there seems to be a problem please try again.');
                            }
                            else
                            {
                                alert(ret);
                            }

                        }
                    },
                    error: function(xhr, textStatus, errorThrown)
                    {
                        console.log(xhr, textStatus, errorThrown + 'error');
                        return false;
                    },
                    complete: function()
                    {
                        $theForm.find(':input').removeAttr('disabled'); //unlock form
                    }
                });
             }
         });

})(jQuery, window, document);
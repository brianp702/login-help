$(document).ready(function() {
    $('.initial').fadeIn();
    $('#accountNumber').val('');
    $('#accountNumber').focus();

    $(document).ajaxStart(function() {
        $('.buttons').LoadingOverlay("show");
    });
    $(document).ajaxStop(function() {
        $('.buttons').LoadingOverlay("hide");
    });
    $.LoadingOverlaySetup({ image: "Images/loading.gif" });

    $('#submitAccountNumber').click(function() {
        if ($('#formOne').valid()) {
            $.ajax({
                cache: false,
                url: 'loginhelp.ajax.php',
                type: "POST",
                data: {
                    action: 'submitAccountNumber',
                    accountNumber: $('#accountNumber').val(),
                    csrfToken: $('#formOne input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    $('#one').hide();
                    $('#two').fadeIn();
                    $('#username').val('');
                    $('#username').focus();
                },
                error: function() {}
            });
        } else {
            //$('#formOne').validate().resetForm();
            //$('#accountNumber').removeClass('error');
        }
    });
    $('#submitUsername').click(function() {
        if ($('#username').val().toLowerCase() == 'admin') $('#username').val('Administrator');
        if ($('#formTwo').valid()) {
            $.ajax({
                cache: false,
                url: 'loginhelp.ajax.php',
                type: "POST",
                data: {
                    action: 'submitUsername',
                    userName: $('#username').val(),
                    csrfToken: $('#formTwo input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    if (result.success) {
                        $('#two').hide();
                        $('#three').fadeIn();
                        $('#userPassword').val('');
                        $('#userPassword').focus();
                    } else {
                        window.location = "login.cfm";
                    }
                },
                error: function() {}
            });
        }
    });
    $('#submitEmailAddress').click(function() {
        if ($('#formTwoA').valid()) {
            $.ajax({
                cache: false,
                url: 'loginhelp.ajax.php',
                type: "POST",
                data: {
                    action: 'submitEmailAddress',
                    emailAddress: $('#emailAddress').val(),
                    csrfToken: $('#formTwoA input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    $('#twoA').hide();
                    $('#twoB').fadeIn();
                },
                error: function() {}
            });
        }
    });
    $('#submitEmailAddressThreeFour').click(function() {
        if ($('#formThreeFour').valid()) {
            $.ajax({
                cache: false,
                url: 'loginhelp.ajax.php',
                type: "POST",
                data: {
                    action: 'submitEmailAddressThreeFour',
                    emailAddressThreeFour: $('#emailAddressThreeFour').val(),
                    csrfToken: $('#formThreeFour input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    if (result.success) {
                        $.ajax({
                            cache: false,
                            url: 'loginhelp.ajax.php',
                            type: "POST",
                            data: {
                                action: 'getPasswordRules',
                                csrfToken: $('#formThreeFour input[name=csrfToken]').val()
                            },
                            dataType: "json",
                            success: function(result) {
                                if (result.success) {
                                    $('#passwordRules').html(result.message);
                                    $('#threeFour').hide();
                                    $('#threeOneA').fadeIn();
                                    $('#verificationCode').val('');
                                    $('#verificationCode').focus();
                                } else {
                                    alert(result.message);
                                }
                            },
                            error: function() {}
                        });
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {}
            });
        }
    });
    $('#forgotUsername').click(function() {
        $('#two').hide();
        $('#twoA').fadeIn();
        $('#emailAddress').val('');
        $('#emailAddress').focus();
    });

    $('#redirectToLoginFourB').click(function() {
        $('#fourBForm').prop("action", "/login.cfm");
    });

    $('#submitUserPassword').click(function() {
        if ($('#formThree').valid()) {
            $.ajax({
                cache: false,
                url: 'loginhelp.ajax.php',
                type: "POST",
                data: {
                    action: 'submitUserPassword',
                    password: $('#userPassword').val(),
                    csrfToken: $('#formThree input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    if (result.success) {
                        $.ajax({
                            cache: false,
                            url: 'loginhelp.ajax.php',
                            type: "POST",
                            data: {
                                action: 'checkForUserAuthenticator',
                                csrfToken: $('#formThree input[name=csrfToken]').val()
                            },
                            dataType: "json",
                            success: function(result) {
                                if (result.success) {
                                    $('#three').hide();
                                    $('#fourA').fadeIn();
                                } else {
                                    $('#three').hide();
                                    $('#fourB').fadeIn();
                                    $('#redirectToLoginFourB').focus();
                                }
                            },
                            error: function() {}
                        });
                    } else {
                        $.ajax({
                            cache: false,
                            url: 'loginhelp.ajax.php',
                            type: "POST",
                            data: {
                                action: 'checkForUserAuthenticator',
                                csrfToken: $('#formThree input[name=csrfToken]').val()
                            },
                            dataType: "json",
                            success: function(result) {
                                if (result.success) {
                                    $('#three').hide();
                                    $('#userPasscode').val('');
                                    $('#threeOne').fadeIn();
                                    $('#userPasscode').focus();
                                } else {
                                    $('#three').hide();
                                    $('#threeTwo').fadeIn();
                                }
                            },
                            error: function() {}
                        });
                    }
                },
                error: function() {

                }
            });
        }
    });
    $('#forgotPassword').click(function() {
        $.ajax({
            cache: false,
            url: 'loginhelp.ajax.php',
            type: "POST",
            data: {
                action: 'checkForUserAuthenticator',
                csrfToken: $('#formThree input[name=csrfToken]').val()
            },
            dataType: "json",
            success: function(result) {
                if (result.success) {
                    $('#three').hide();
                    $('#userPasscode').val('');
                    $('#threeOne').fadeIn();
                    $('#userPasscode').focus();
                } else {
                    $('#three').hide();
                    $('#threeTwo').fadeIn();
                }
            },
            error: function() {}
        });
    });
    $('#submitUserPasscode').click(function() {
        if ($('#formThreeOne').valid()) {
            $.ajax({
                cache: false,
                url: 'loginhelp.ajax.php',
                type: "POST",
                data: {
                    action: 'submitUserPasscode',
                    passcode: $('#userPasscode').val(),
                    csrfToken: $('#formThreeOne input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    if (result.success) {
                        if (result.hasemail) {
                            $.ajax({
                                cache: false,
                                url: 'loginhelp.ajax.php',
                                type: "POST",
                                data: {
                                    action: 'getPasswordRules',
                                    csrfToken: $('#formThreeOne input[name=csrfToken]').val()
                                },
                                dataType: "json",
                                success: function(result) {
                                    if (result.success) {
                                        $('#passwordRules').html(result.message);
                                        $('#threeOne').hide();
                                        $('#threeOneA').fadeIn();
                                        $('#verificationCode').val('');
                                        $('#verificationCode').focus();
                                    } else {
                                        alert(result.message);
                                    }
                                },
                                error: function() {}
                            });
                        } else {
                            $.ajax({
                                cache: false,
                                url: 'loginhelp.ajax.php',
                                type: "POST",
                                data: {
                                    action: 'hasSecretQuestions',
                                    csrfToken: $('#formThreeOne input[name=csrfToken]').val()
                                },
                                dataType: "json",
                                success: function(result) {
                                    if (result.success) {
                                        $.ajax({
                                            cache: false,
                                            url: 'loginhelp.ajax.php',
                                            type: "POST",
                                            data: {
                                                action: 'getSecretQuestion',
                                                csrfToken: $('#formThreeOne input[name=csrfToken]').val()
                                            },
                                            dataType: "json",
                                            success: function(result) {
                                                if (result.success) {
                                                    $('#threeOne').hide();
                                                    $('#answer').val('');
                                                    $('#threeThree').fadeIn();
                                                    $('#answer').focus();
                                                    $('#question').html(result.question + "?");
                                                } else {
                                                    //alert(result.message);
                                                }
                                            },
                                            error: function() {}
                                        });
                                    } else {
                                        $('#threeOneA').hide();
                                        $('#threeTwoA').fadeIn();
                                    }
                                },
                                error: function() {}
                            });
                        }
                    } else {
                        alert(result.message);
                    }
                },
                error: function() {}
            });
        }
    });
    $('#removeAuthenticator').click(function() {
        if ($('#formFiveA').valid()) {
            $.ajax({
                cache: false,
                url: 'loginhelp.ajax.php',
                type: "POST",
                data: {
                    action: 'removeAuthenticator',
                    resetCode: $('#resetCode').val(),
                    csrfToken: $('#formFiveA input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    if (result.success) {
                        window.location = "login.cfm";
                    } else {
                        alert(result.message);
                        if (result.title == 'Account Locked') { window.location = "login.cfm"; }
                    }
                },
                error: function() {}
            });
        }
    });
    $('#submitVerificationCodeAndNewPassword').click(function() {
        if ($('#formThreeOneA').valid()) {
            $.post({
                cache: false,
                url: 'loginhelp.ajax.php',
                data: {
                    action: 'submitVerificationCodeAndNewPassword',
                    verificationCode: $('#verificationCode').val(),
                    newPassword: $('#newPassword').val(),
                    newPasswordVerify: $('#newPasswordVerify').val(),
                    csrfToken: $('#formThreeOneA input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    if (result.success) {
                        window.location = "login.cfm";
                    } else {
                        alert(result.message);
                        if (result.title == 'Account Locked') { window.location = "login.cfm"; }
                    }
                },
                error: function() {}
            });
        }
    });
    $('#submitNewPasswordThreeThreeA').click(function(e) {
        if ($('#formThreeThreeA').valid()) {
            $.post({
                cache: false,
                url: 'loginhelp.ajax.php',
                data: {
                    action: 'submitNewPasswordThreeThreeA',
                    newPasswordThreeThreeA: $('#newPasswordThreeThreeA').val(),
                    newPasswordVerifyThreeThreeA: $('#newPasswordVerifyThreeThreeA').val(),
                    csrfToken: $('#formThreeThreeA input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    if (result.success) {
                        window.location = "login.cfm";
                    } else {
                        alert(result.message);
                        if (result.title == 'Account Locked') { window.location = "login.cfm"; }
                    }
                },
                error: function() {}
            });
        }
    });

    $('#myModalLink').click(function() {
        if ($("#myModalLink").html() == 'OK') $("#myModal").modal("hide");
    });

    $('#submitSecretQuestion').click(function() {
        if ($('#formThreeThree').valid()) {
            $.ajax({
                cache: false,
                url: 'loginhelp.ajax.php',
                type: "POST",
                data: {
                    action: 'submitSecretQuestion',
                    answer: $('#answer').val(),
                    csrfToken: $('#formThreeThree input[name=csrfToken]').val()
                },
                dataType: "json",
                success: function(result) {
                    if (result.success && !result.done) {
                        $('#answer').val('');
                        $('#answer').focus();
                        $.ajax({
                            cache: false,
                            url: 'loginhelp.ajax.php',
                            type: "POST",
                            data: {
                                action: 'getSecretQuestion',
                                csrfToken: $('#formThreeThree input[name=csrfToken]').val()
                            },
                            dataType: "json",
                            success: function(result) {
                                if (result.success) {
                                    $('#question').hide();
                                    $('#question').html(result.question + "?").fadeIn();
                                    $('#threeThree').fadeIn();
                                    $('#answer').val('');
                                    $('#answer').focus();
                                }
                            },
                            error: function() {}
                        });
                    } else {
                        if (result.success && result.done) {
                            $('#threeThree').hide();

                            $.ajax({
                                cache: false,
                                url: 'loginhelp.ajax.php',
                                type: "POST",
                                data: {
                                    action: 'getPasswordRules',
                                    csrfToken: $('#formThreeThree input[name=csrfToken]').val()
                                },
                                dataType: "json",
                                success: function(result) {
                                    if (result.success) {
                                        $('#passwordRulesThreeThreeA').html(result.message);
                                        $('#threeThreeA').fadeIn();
                                        $('#newPasswordThreeThreeA').val('');
                                        $('#newPasswordThreeThreeA').focus();
                                    }
                                },
                                error: function() {}
                            });
                        } else {
                            $("#myModal div.modal-body").html(result.message);
                            $("#myModalDismiss").addClass("hidden");
                            $("#myModal").modal("show");
                        }
                    }
                },
                error: function() {}
            });
        }
    });

    $('#fourMultifactorEnabled').click(function() {
        $('#four').hide();
        $('#fourA').fadeIn();
    });
    $('#fourMultifactorNotEnabled').click(function() {
        $('#four').hide();
        $('#fourB').fadeIn();
    });
    $('#threeEnabledMultifactor').click(function() {
        $('#threeA').hide();
        $('#userPasscode').val('');
        $('#threeOne').fadeIn();
        $('#userPasscode').focus();
    });
    $('#threeEotEnabledMultifactor').click(function() {
        $('#threeA').hide();
        $('#threeTwo').fadeIn();
    });
    $('#canGeneratePasscode').click(function() {
        $('#fourA').hide();
        $('#fourB').fadeIn();
    });
    $('#cannotGeneratePasscode').click(function() {
        $('#fourA').hide();
        $('#five').fadeIn();
    });
    $('#knowEmailAddress').click(function() {
        $('#threeTwo').hide();
        $('#threeFour').fadeIn();
        $('#emailAddressThreeFour').val('');
        $('#emailAddressThreeFour').focus();
    });
    $('#dontKnowEmailAddress').click(function() {
        $.ajax({
            cache: false,
            url: 'loginhelp.ajax.php',
            type: "POST",
            data: {
                action: 'hasSecretQuestions',
                csrfToken: $('#threeTwoform input[name=csrfToken]').val()
            },
            dataType: "json",
            success: function(result) {
                if (result.success) {
                    $.ajax({
                        cache: false,
                        url: 'loginhelp.ajax.php',
                        type: "POST",
                        data: {
                            action: 'getSecretQuestion',
                            csrfToken: $('#threeTwoform input[name=csrfToken]').val()
                        },
                        dataType: "json",
                        success: function(result) {
                            if (result.success) {
                                $('#question').html(result.question + "?");
                                $('#threeTwo').hide();
                                $('#answer').val('');
                                $('#threeThree').fadeIn();
                                $('#answer').focus();
                            }
                        },
                        error: function() {
                            alert("Error when fetching the Secret Questions.");
                        }
                    });
                } else {
                    $('#threeTwo').hide();
                    $('#threeTwoA').fadeIn();
                }
            },
            error: function() {}
        });

    });
    $('#haveResetCode').click(function() {
        $('#five').hide();
        $('#fiveA').fadeIn();
        $('#resetCode').val('');
        $('#resetCode').focus();
    });
    $('#noResetCode').click(function() {
        $('#five').hide();
        $('#fiveB').fadeIn();
    });
    $('#noPasscodeEmail').click(function() {
        $.ajax({
            cache: false,
            url: 'loginhelp.ajax.php',
            type: "POST",
            data: {
                action: 'hasSecretQuestions',
                csrfToken: $('#formThreeOneA input[name=csrfToken]').val()
            },
            dataType: "json",
            success: function(result) {
                if (result.success) {
                    $.ajax({
                        cache: false,
                        url: 'loginhelp.ajax.php',
                        type: "POST",
                        data: {
                            action: 'getSecretQuestion',
                            csrfToken: $('#formThreeOneA input[name=csrfToken]').val()
                        },
                        dataType: "json",
                        success: function(result) {
                            if (result.success) {
                                $('#threeOneA').hide();
                                $('#answer').val('');
                                $('#threeThree').fadeIn();
                                $('#answer').focus();
                                $('#question').html(result.question + "?");
                            }
                        },
                        error: function() {}
                    });
                } else {
                    $('#threeOneA').hide();
                    $('#threeTwoA').fadeIn();
                }
            },
            error: function() {}
        });
    });

    $("[id*='redirectToLogin']").click(function() {
        window.location = "login.cfm";
    });
    $('.helpText').hide();
    $('.helpLink').click(function() {
        $(this).next('.helpText').toggle('fade');
    });

    // refresh timer after each ajax call
    $("body").bind("ajaxComplete", function(e, xhr, settings) {
        SessionIdleTimeout(1);
    });

    $.validator.setDefaults({
        debug: true
    });

    $("#formOne").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            accountNumber: {
                required: true,
                digits: true
            }
        }
    });

    $("#formTwo").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            username: {
                required: true
            }
        }
    });

    $("#formThree").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            userPassword: {
                required: true
            }
        }
    });

    $("#formThreeOne").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            userPasscode: {
                required: true
            }
        }
    });
    $("#formTwoA").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            emailAddress: {
                required: true,
                email: true
            }
        }
    });
    $("#formThreeOneA").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            verificationCode: {
                required: true
            },
            newPassword: {
                required: true
            },
            newPasswordVerify: {
                required: true,
                equalTo: "#newPassword"
            }
        },
        messages: {
            newPasswordVerify: {
                equalTo: "Enter a matching password."
            }
        }
    });
    $("#formThreeThreeA").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            newPasswordThreeThreeA: {
                required: true
            },
            newPasswordVerifyThreeThreeA: {
                required: true,
                equalTo: "#newPasswordThreeThreeA"
            }
        },
        messages: {
            newPasswordVerifyThreeThreeA: {
                equalTo: "Enter a matching password."
            }
        }
    });
    $("#formThreeThree").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            answer: {
                required: true
            }
        }
    });
    $("#formThreeFour").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            emailAddressThreeFour: {
                required: true,
                email: true
            }
        }
    });
    $("#formFiveA").validate({
        onfocusout: false,
        onkeyup: false,
        onclick: false,
        rules: {
            resetCode: {
                required: true
            }
        }
    });
});
var TimerId = setTimeout("", 1000000);

function openTimeoutDlg(minutes) {
    if (!$('#timeoutDlg').length) {
        $("body").append("<div id='timeoutDlg'></div>");
        $("#timeoutDlg").dialog({
            autoOpen: false,
            modal: true,
            draggable: true,
            resizable: false,
            width: 600,
            buttons: {
                'Close': function() {
                    $(this).dialog('close');
                }
            },
            open: function() {
                var minutes = $(this).dialog("option", "minutes");
                var mdesc = minutes + " minutes";
                if (minutes == 1)
                    mdesc = "1 minute";
                $("#timeoutDlg").html("<h1>Timeout Warning</h1><p>Your session will be discontinued in " + mdesc + ".</p>");
            },
            minutes: 'unknown'
        });
    }
    $("#timeoutDlg").dialog("option", "minutes", minutes).dialog("open");
};

function SessionIdleTimeout(level) {
    clearTimeout(TimerId);

    // Re-set the timer to 15 minutes
    if (level == 1) {
        TimerId = setTimeout("SessionIdleTimeout(2)", 14 * 60000); // 14 minutes
        return;
    }

    // 5 minute warning
    if (level == 2) {
        TimerId = setTimeout("SessionIdleTimeout(3)", 5 * 60000); // 5 minutes
        openTimeoutDlg(5);
        return;
    }

    // 1 minute warning
    if (level == 3) {
        TimerId = setTimeout("SessionIdleTimeout(4)", 1 * 60000); // 1 minute
        openTimeoutDlg(1);
        return;
    }

    // Inactivity timeout -- log user off
    if (level == 4) {
        window.location = "logout.cfm?reason=timeout";
        return;
    }
}

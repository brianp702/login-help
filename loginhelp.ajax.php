<?
function response($status,$status_message,$data=""){
	header("HTTP/1.1 ".$status);
	
	$response['status']=$status;
	$response['status_message']=$status_message;
	$response['data']=$data;
	
	$json_response = json_encode($response);
	echo $json_response;
}

switch ($_GET['action']) {
	case "submitAccountNumber":
		$_SESSION['accountNumber'] = $_GET['accountNumber'];
		break;
	case "submitUserName":
		$_SESSION['userName'] = $_GET['userName'];
		
		$query = "select 
					userName,
					userId,
					accountNumber 
				from users u
				left join accounts a on u.accountId = a.accountId
				where userName = :userName";
		$results = $query->execute();

		if($results){
			response(200,"username exists","");
		} else {
			response(200,"username does not exist","");
		}
		
		break;
	case "submitEmailAddress":
		//emailAddress: $('#emailAddress').val(),        
		break;
	case "submitUserPassword":
		//password: $('#userPassword').val(),
		
		break;
	case "checkForUserAuthenticator":
		//
		break;
	case "submitUserPasscode":
		//resetCode: $('#resetCode').val(),
		// check for a match with the resetcode saved in the session. If match, then
		break;
	case "getPasswordRules":
		// sql query to get password rules
		$query = "select rules from accountConfig where accountId = :accountId";
		$results = $query->execute();
		response(200,"password rules",$results);

		break;
	case "removeAuthenticator":
		// SQL query to remove 2FA authenticator from database
		$query = "update user set 2FactorAuthenticator = '' where userId = :userId and accountId = :accountId";
		response(200,"Authenticator removed","");
		
		break;
	case "submitVerificationCodeAndNewPassword":
		//verificationCode: $('#verificationCode').val(),
		//newPassword: $('#newPassword').val(),
		//newPasswordVerify: $('#newPasswordVerify').val(),
		
		break;
	case "submitNewPasswordThreeThreeA":
		//newPasswordThreeThreeA: $('#newPasswordThreeThreeA').val(),
		//newPasswordVerifyThreeThreeA: $('#newPasswordVerifyThreeThreeA').val(),
		break;
	case "submitSecretQuestion":
		//answer: $('#answer').val(),
		
		break;
	case "hasSecretQuestions":
		
		break;

	default:

		break;
}

?>

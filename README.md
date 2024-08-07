# Login help
Login help is a single page JS app (jQuery/AJAX) for users that forgot their login credentials. Here, the backend is in PHP, and not fleshed out. Of course, the original implementation for the client was completely functional, with a backend in ColdFusion and SQL Server.

The original implementation for the client does much more that recover a password. It is made for a system where each user has an account number, username, password, email, security questions, and 2 factor authentication. If the user knows at least some of these things, they can likely reset their password.

The problem: a significant percentage of the client's support calls were from customers that needed help logging in to the system. The nature of the login process and security made it challenging to provide self service password recovery.

The solution: walk the user through the recovery process, depending on their account and user configurations. 

The result: customer support calls decreased and they were able to reduce their wait times significantly.

The hardest part of the project was creating a flowchart of the password recovery process that used all of the security features of the system. QA had a wonderful time testing the dozens of possible flows, each one requiring a different account setup.

The password reset process could be different for each user, depending on how their account administrator set up the account.

Examples:

* One user could have 3 secret questions, another user could have 5. 
* One user might be allowed 3 failed login attempts before being locked out, another user might only have 1 attempt.
* User lockout time could be any duration set by the administrator.
* One user might be required to enter a multifactor authenticator code at each login, in addition to their password. Other users might only need a password.
* Most users had email addresses associated with their account, but some didn't. These users couldn't have their username or verification code emailed to them. But if they knew their secret questions or had a multifactor authenticator code, they were still able to reset their password.

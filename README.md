# LoginHelp
Login help for users that forgot their credentials. Coded by Brian Payne during his employment at Shift4 Payments.

Open https://s706.dollarsonthenet.net/ and click the link "Login Help"

This is a single page JavaScript app (jQuery/AJAX). The heavy lifting is done with ColdFusion components and SQL on the backend. The user is guided though the process of logging in or resetting their password, by verifying their identity through account ID, user name, email, security questions, and 2 factor authentication (if enabled). You won't get far without valid information.

The backend code (ColdFusion) is confidential, but the HTML, CSS and JavaScript files are public by viewing the source code of loginHelp.cfm (https://s706.dollarsonthenet.net/loginHelp.cfm). 

The noteworthy JavaScript code is in this file: https://s706.dollarsonthenet.net/js/loginhelp.js

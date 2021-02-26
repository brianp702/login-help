# LoginHelp
Login help for users that forgot their credentials. Coded by Brian Payne in 2016 during his employment at Shift4 Payments. This is one of the few publicly visible web sites that I (Brian) worked on at Shift4. Most of my work was confidential and secured behind logins and within web services.

Open https://s706.dollarsonthenet.net/ and click the link "Login Help"

This is a single page JavaScript app (jQuery/AJAX). The heavy lifting is done with ColdFusion components and SQL on the backend. The user is guided though the process of logging in or resetting their password, by verifying their identity through account ID, user name, email, security questions, and/or 2 factor authentication (if enabled). You won't get far without valid information.

The backend code (ColdFusion) is confidential, and that's where all the interesting logic is. But the HTML, CSS and JavaScript files are public by viewing the source code of loginHelp.cfm.

Noteworthy files:
view-source:https://s706.dollarsonthenet.net/loginHelp.cfm
https://s706.dollarsonthenet.net/js/loginhelp.js
https://s706.dollarsonthenet.net/css/login.css


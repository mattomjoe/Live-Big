# **__TheyMightBeGiants__**
Project #2

# **__Group Members__**
Nicole T
<br>
Matt J
<br>
Antonio
<br>
Adam
<br>

# **__What Problem Does The Application Solve?__**  
Live Big is an app that lets you track your daily habits and allows the user to create new habits that they would like to accomplish to enhance their daily lifestyle.

# **__What Is The App Doing And Why?__**
Live Big is keeping track of the user's activity goals that they would like to keep track of throughout the week to better their good habits in their lives. Everyone at some point in their life wants to try and get on the right path to a healthier life, and we created Live Big to help them stay on the right path and help accomplish those goals. 

# **__How Is The App Used/Organized?__**
Live Big is organized through multiple pages. We have a page that greets the user, a page that prompts them to log in, a page that allows them to register an account, and a page that handles the sign-in process itself (although these last two are handled through Okta and not really part of the site proper).

Another page we have allows the user to input the activities that they are accomplishing throughout the week, and have that information stored into a table to track the progress.

The last page is where the user sees how many of their goals they have completed and how far they've come to completing all of their goals. This is also the page where they can mark their goals as complete.

# **__Login and Authentication__** 
Login and authentication are handled through Okta.

The user can register for an account by clicking on "Register" in the navbar. Unfortunately, this doesn't currently also log the user in, so they will have to click on "Log in" afterwards in order to do that, even though they've only just registered their account. Logout is handled similarly, by clicking on the "Log out" button at the top of the screen.

Clicking on "Log in" will bring the user to an Okta sign-in screen, where they will prompted to enter their email and password. Once they've done that, they will be taken to the landing page, where they will see two buttons -- one that will take them to the page for creating and deleting habits, and one that will take them to the page for completing habits. Note that, currently, completed habits do not reset to incomplete by the end of day or week.

# **__How to See Data for Multiple Users__** 
It is also worth noting that Okta user accounts are not currently linked to the data in the database's Users table. The only way to currently see or change the data associated with different users is to edit the URL yourself.

By default, the buttons on the screen will take you through the pages associated with the Users row that has a primary key/id of 1. To instead see the pages for the user with an id of 2, you would want to enter "https://theymightbegiants.herokuapp.com/create/2" or "https://theymightbegiants.herokuapp.com/review/2." Similarly, to see the pages for the user with an id of 3, you'd want to enter "https://theymightbegiants.herokuapp.com/create/3" or "https://theymightbegiants.herokuapp.com/review/3." And so on for each user in the Users table.

Note that while this is necessary, and while there are currently only five rows of dummy data in the Users table (which cannot be added to, deleted or modified from the site itself), habits for each user can be created, completed or deleted from the site without any problem.

# **__Technology Used:__**
* Node.js
* Express
* MySQL
* Javascript/jQuery
* Bootstrap 4
* HTML/CSS 
* Sequelize
* Handlebars
* Heroku
* Okta

# **__Each Team Member's Role In The App Development__**
* Nicole - Front end
* Adam - Front end
* Matt - Back end
* Antonio - Back end
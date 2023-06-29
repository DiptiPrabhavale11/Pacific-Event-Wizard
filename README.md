# Pacific Event Wizard
The Pacific Event Wizard application is a common platform for all the UOP students to get the details
of all the on-campus events organized by various clubs and departments altogether. It can be accessed using [this link](https://pacific-event-wizard.onrender.com/).

*  <b>Targeted Users for this application </b>

   - All the University of the Pacific students who want to explore the different activities/ events on the campus.
   - All the representatives of various clubs inside University of the Pacific can use this application
   - All the faculty members who are representatives of various departments.
   - Students out of the University of the Pacific can not use it.
  
* ## Features/Functionalities Supported ##
  *  <b> Populate Users with different roles</b>
  
     Various users with various roles, such as Superadmin, Admin, and Student, will be pre-populated in the app header to bypass login functionality. The role of the chosen user will determine how the application operates. For instance, if a person is selected with the role of Admin, they can create a new event, but if the user is selected with the role of Student, they won't be able to see the option to create an event.
     
     ![image](https://user-images.githubusercontent.com/113642858/235373225-bb14ed72-19f9-4aa4-8045-6068da64632f.png)

     
  *  <b> Listing all the events</b>
  
     On the landing page, all the events will be listed with the club's image, date, time and venue of the Event. On click on event it will open up a new page that will display all the remaining details of the event.
     
     ![image](https://user-images.githubusercontent.com/113642858/235738020-e335cb92-b8a4-4df7-a894-91812b1320d9.png)

  
  *  <b> Create new event </b>(Access only to Superadmin and Club Admin)
    
      A new event creation option is available in the app header for users with the roles of superadmin or admin. A new form will be opened when the create event option is clicked, allowing the user to enter new event information. The required fields for creating any event are Title, Location, and Email. If these fields are not properly filled out, the user will receive an error and cannot continue with the event creation. If user selects start date greater than end date, it will show the error notification and restrict user to create a new event
      
      ![image](https://user-images.githubusercontent.com/113642858/235373192-0f6fbbbc-c5c8-40d0-9b89-3ef4714cdf78.png)
      
      ![image](https://user-images.githubusercontent.com/113642858/235848499-1747d1d2-4d21-4d94-808c-ee740b898277.png)


  *  <b> Event's Detail Page</b>
  
     Any event name can be clicked to open a new page with all the event's other details, including type, location, email, food availability, etc. User will have a few action buttons at the bottom to mark any event as 'Attend', 'May be', 'No' and 'Attend Online'
     
     ![image](https://user-images.githubusercontent.com/113642858/235373176-460d417b-d461-4478-a74c-645f033ce6f9.png)

  
  *  <b> Populate Attendee's details per event</b> (Access only to Superadmin and Club Admin)
  
     If the user is either super admin or admin, he will be able to access the list of people attending as well as the event information, as seen in the image above. If the user is a student, the only thing he can see is how many people are attending the event, as shown in the picture below.
     
     ![image](https://user-images.githubusercontent.com/113642858/235373491-75fd600e-86d6-4fca-9253-7da47f24f431.png)

  
  *  <b> Create a club (Access only to Superadmin)</b>
  
     If the user is a superadmin then he can create a new club. On click of Create club option from app header, it will open up a new form to create a new club.
     
     ![image](https://user-images.githubusercontent.com/113642858/235373663-1f445f4b-83cc-4f7d-9109-0636e9a250e8.png)

  *  <b> Attend Event </b>
  
     The user can mark the event as Attending by clicking the Attend button at the bottom of the Event Detail page. It will include the user's name in the attendee's list. 
  
  *  <b> Application Notifications </b>
  
     When a user successfully creates an event, or club, or marks an event as 'Attending,' they will receive several notification messages.
     
  
  *  <b> Search Event </b>
  
     User can type any name he is looking for inside the searchbox on the listing page and get the matching results as soon as he types. On the click of a clear icon or manual text clearing, the app will re-populate the list of all the events again. By default, all the events will be sorted descending based on the start date of the event.
     
      ![image](https://user-images.githubusercontent.com/113642858/235738517-01cd050f-8ba8-4056-a7ee-5894095c3f43.png)

     
  *  <b> Filtering of Events </b>
  
     On the event listing page, quick filtering options such as 'Today,' 'Tomorrow,' 'This Month,' and 'Next Month' are available. Using this filter, the user can filter the event list as well as use the search feature in conjunction with the filter results. Aside from that, there are some additional filters available, such as type, location, food, and date range. When you click the filter button, it will open a new modal that will accept the filter input and filter the events depending on the filters you have selected. Users can clear all the pre-selected values on the modal by clicking the clear button. If user selects any start date, by default it will populate next day as end date ( +24 hours). Also, if user selects the end date less than start date then it will automatically adjust the start date as previous day ( -24 hours).
     
     ![image](https://user-images.githubusercontent.com/113642858/235737534-5c5b6f61-4034-44be-886d-eec4f39cae43.png)

     ![image](https://user-images.githubusercontent.com/113642858/235738795-0ba63b99-d22d-4ed4-a92b-b32b33f0e033.png)

     
  *  <b> Reset Filters </b>
  
     Users can reset all the applied filters by clicking on the Reset button on the event listing page.
     
     ![image](https://user-images.githubusercontent.com/113642858/235739008-b8abe690-8d16-4e1d-9cf1-e0304d606c3b.png)
  
  *  <b> About Page </b>   
      
     On clicking the About menu from the application header, it will redirect to the about page. It gives overall information about the application such as purpose and targeted audience.
     
     ![image](https://user-images.githubusercontent.com/113642858/235768890-f741e00d-69df-4954-aa43-92455dd09fa6.png)


* ## Features/Functionalities Missing ##
  * Login Functionality
  * Mark Events with other Statues like May be, No, Attend Online

* ## Technologies/libraries used ##
  
  The front end is developed using React.js, Javascript, HTML, CSS, [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction), and [Material UI](https://mui.com/material-ui/getting-started/overview/). 
  The Backend is developed using MongoDb, Express, Node and Javascript. Apart from this main technological stack, I have used [react-datetime](https://www.npmjs.com/package/react-datetime) for implementing date and time picker. For Rendering differnt icons I have used [React Icons](https://react-icons.github.io/react-icons/search?q=loca)

* ## How to download run the project ? ##

    * <b> STEP 1:</b> Dowload or clone the repository using command ``` git clone https://github.com/comp227/final-dipti.git ```
    * <b> STEP 2:</b> Create two .env files inside root folder and front-end folder respectively.
    * <b> STEP 3:</b> Add REACT_APP_DATABASE= mongodb OR  REACT_APP_DATABASE= firebase inside .env file form front-end folder. Application will point to the respective database based on the values provided (i.e. mongodb or firebase)
    * <b> STEP 4:</b> Add MONGODB_URI, PORT inside .env file from the roor folder. It will point to specified mongoDB database.
    * <b> STEP 5:</b> Go to the root folder (i.e. Pacific-Event-Wizard) and run ``` npm install ```
    * <b> STEP 6:</b> To run backend code execute command ``` npm start ```. It will start the server at http://locahost:3001
    * <b> STEP 7:</b> To run front-end code go to the folder front-end and run ``` npm install ```.
    * <b> STEP 8:</b> Execute command ``` npm start ```. It will start the application at http://locahost:3000
    

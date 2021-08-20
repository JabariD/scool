# To run simply navigate to:
https://scool-8772f.firebaseapp.com/

## **What is Scool**

Scool is an Ed-tech application that aims to simplify the tutoring/academic support process. It is a web application platform (that ideally will have 2 domains: web and mobile) that allows students to…

- Ask questions and provide answers to peers while racking up rewards
- Get access to course specific material
- In a timely and reliable fashion.
- Connect with other students by sending DM&#39;s and allow scheduling live chats or meetups.
- Integrated rating system to verify credibility

This design document explains the technical decisions made and the design of the entire Scool application.

## **Context**

2020 emphasized the disconnect college students feel when receiving help with their studies. Students are unable to get help for their classes or have trouble understanding concepts at the exact time they need it because the current tutoring system is inefficient and unreliable.

Inefficient and unreliable is defined as students saying…

- I can&#39;t find answers to all my questions and there are no tutors for most of my courses at the tutoring center.
- I have classes during office hours and tutoring sessions and I study only at night.
- I always need to pay to get full access. As a broke college student eating $69 bland ramen noodles, this is not cost effective

This coupled with the fact that we have seen the rise of open source question and answer platform with…

- Virtual schooling
- Challenges with online classes
- Lack of social interaction

Also, rise in Ed-tech use since COVID-19 as of 2019 Ed-tech investments reached 19.4 billion and the pandemic only accelerated the adoption of digital technology in education so investments projected to grow a whooping 15%.

## **Product Requirements**

This is a solid list of requirements. This is extremely verbose, but will be taken down to be more concise.

### **Authentication**

- User will be able to **sign up** (with their Google .edu account) to the application and populate the database with a new user.
  - Backend: Will be able to receive this request and populate the database with a new user accordingly.
  - _Attributes: Should be really easy to sign up._
- User will be able to **sign in**
  - The backend will be able to receive this request and sign this user in and they should be taken immediately to their feed.
- Any user will be able to see their notifications within the application.
- A signed user can send and receive direct messages, this will not be anonymous.

### **Posting a question to Feed**

- A signed user will be able to **POST a question** they can choose to specify if it will show up on the Local Feed v International Feed
- They can also EDIT / DELETE the question.
  - Frontend: Requires Text input, press enter, it should show up
  - Backend: should receive this action and put the request in it&#39;s place obviously the Local or International.
  - Questions in the Local can ALWAYS be bumped up to International by the Author.
  - A question has certain attributes. A user can choose to POST this question anonymously. User can set tags for the question.
    - A character limit! (TODO: Research acceptable ones)
  - _Attributes: The less options the better_

### **Home Feed**

- The Feed will have a (2 specific tabs) **Local Feed and International Feed**.
  - Frontend: Retrieve list of Question components and display.
  - Backend: None.
  - Be able to see on each question Up/Down votes on responses, tags for the question, Views (how many people saw this question)
- Only signed in users can search the Feed by topic, tags, filter by another user
- Signed users user will be able to **reply to a question anonymously or as themselves (only signed in users)** in International Feed.
  - They can also EDIT / DELETE the reply.

### **Trending Feed**

- The Trending tab will be the most popular questions only in the INTERNATIONAL feed in X time. (TODO: research how YouTube trending works)
  - Roughly it will be based upon a 1.5-2 day time, meaning every 1.5-2 days, check the
  - Or simply every 1.5-2 days, select the question that has the most X (views, upvotes, or whatever). Probably Upvotes.

### **Profile Page**

- The Profile page is a user&#39;s profile page. The user can specify the privacy settings of things that should be displayed and what shouldn&#39;t.
- Any user will be able to see what&#39;s currently on that user&#39;s profile page. The current attributes for a user include:
  - Name
  - Profile Picture
  - Bio
  - Classes Taken
  - Graduation
  - Major
  - Minor
  - Questions Posted
  - DM&#39;s and Zoom Schedules
  - Badges
- If they allow the option, a select sum of users will be able to DM a user. Or schedule for Zoom or Google Meet time.

### **Direct Messaging**

- A user will only be able to Direct Message a user through

### **Settings**

- Any user can **access the settings page** which has the options for the following attributes:
  - Change Name, View current rating, Profile

### **Rating**

- Scool **will have a rating system**. It will be called: Scool points/bonuses.

### **Reward Points**

- Scool will have an ability to have reward points.
- Reward Points rewarded to those who ask a GOOD question and respond with a GOOD answer.
  - Good will be based upon the amount of UPVOTES.

These requirements also represent the goals.

## **Technical Design + Decisions**

The main technologies used to build Scool will be HTML, CSS, JS with React.js used for the frontend and Firebase for the backend.

- Material UI will be used for the frontend.
- React Router will also be used to handle routes for the frontend.
- Lato Font Family is used on the frontend.

Here&#39;s important information for the backend.

We bring in the idea of groups. The reason we decide NOT to have a general &quot;questions&quot; collection is because it defeats the purpose of the difference of &#39;Local&#39; and &#39;Global&#39;. So, we need some way to differentiate between a questions group for Howard University and Spelman University for example.

So because we are designed for college students and the above, the first few versions of the app will follow this paradigm:

Global Collection -\&gt; Group ID -\&gt; (…) questions

- Custom groups could be added to global collection too!

College Collection -\&gt; College ID -\&gt; (…) questions

Users Collection -\&gt; User ID -\&gt; (…) questions

Even though it would be more efficient to run a single source of truth we write to 2 different listings in Firebase: The Users and the College because this allows for faster queries.

- For reading questions on the Local tab, we simply read off questions in the group for Howard University
- The profile page will simply read off the user&#39;s question objects.

So again, we will POST to both.

### **Authentication**

Guest

The Guest has access to only SEE the questions.

Sign Up

Firebase is used for signing up the user. We want to encourage students to use their .edu accounts.

- The app is called Scool not Life. We want to emphasize the university experience and can expand in the future based on data.

The Sign Up procedure will be as simple as possible, asking only the following input from the user:

- Email/Password

_Do we want users to be forced to have to sign up?_

No primarily because our competition usually doesn&#39;t require it (StackOverflow, Reddit, etc.).

Sign In

Firebase is used for signing in the user.

- Should be one click with their Google account and their good to go.

State Managed

Throughout the app the state of the user is important. Tracking the answer to the question: &quot;Are they a guest or are they a signed user?&quot;.

### **Posting a Question To The Feed**

Choose college..

When the user is on Home (Local or International) Feed or Trending Feed a plus button will show that allows them to POST a question. They are building a question object…

Question Object:

- Has Question Subject
- Has Question Body: Must allow math functions and more easy text options. Character Limit: 30,000ch (Stack Overflow&#39;s limit is 30,000).
  - Ability to add files (pdfs, image, video)
- Has Tags
- Has Upvotes
- Has Downvotes
- Has Comments
- Has Flags
- Has Location (Local or Global)

When the user clicks this button, they will be taken a pop up modal where they can enter fields for their question. Those fields include:

- Question Title
- Question Body: Must allow math functions and more easy text options. Character Limit: 30,000ch (Stack Overflow&#39;s limit is 30,000).
  - Ability to add files (pdfs, image, video)
- createdByUserID owner of question
- upVotes array of IDs
- downVotes array of IDs
- Tags: Must enter 1 tag. Can we do this automatically based on the question subject and body that they enter?
- Time\_posted
- Comments - array each one is a map object with
  - createdByUserID
  - upVotes array of IDS
  - downVotes array of IDS
  - commentBody
  - Replies array has
    - createdByUserID
    - replyBody
- Do they want to post anonymously?

### **Home Feed**

The Home Feed will display the newest/latest Question objects. The Feed will have a (2 specific tabs) Local Feed and International Feed.

NOTE: The user must pick a college.

- Signed in users can filter Question objects which they can utilize at the top with a search bar. They can filter by:
  - Topic
  - Tags
  - User
- Signed users will be able to reply to a question anonymously or as themselves in International Feed.
  - They can also EDIT / DELETE the reply.

### **Trending Feed**

The Trending tab will be the most popular questions only in the INTERNATIONAL feed in X time.

- Roughly it will be based upon a 3 day time, meaning every 3 days, check the ratio between upvotes.

### **Profile Page**

The Profile page is a user&#39;s profile page. The user can specify the privacy settings of things that should be displayed and what shouldn&#39;t. This will be taken directly from JavaScript.

- Any user will be able to see what&#39;s currently on that user&#39;s profile page. The current attributes for a user include:
  - Name
  - Profile Picture
  - Bio
  - Classes Taken
  - Graduation
  - Major
  - Minor
  - Questions Posted
  - DM&#39;s and Zoom Schedules
  - Badges
- If they allow the option, a select sum of users will be able to DM a user. Or schedule for Zoom or Google Meet time.

### **Settings**

Any user can **access the settings page** which has the options for the following attributes:

- Change Name, View current rating, Profile
- This will be saved to their profile in the database.

### **Rating**

Scool **will have a rating system**. It will be called: Scool points/bonuses.

- Rating System 1
  - 200-500 (bronze), 500 - 1000 (silver), 1000-2000 (gold), 2000-4000 (platinum) 4000-10000+ (expert)
  - Asking a question: 10pts
  - Answering a question: 20pts (up-votes below 0 gives no points)

### **Reward Points**

Scool will have an ability to have reward points.

- Reward Points rewarded to those who ask a GOOD question and respond with a GOOD answer.
  - Good will be based upon the amount of UPVOTES.

## **Milestones**

This is a list of milestones. Here&#39;s Mikayla&#39;s list:[https://docs.google.com/document/d/1AOjinfsS5ss41A1uxCdvkKtdxNoG2dPuIA\_rFfiEKUU/edit?ts=6025b916](https://docs.google.com/document/d/1AOjinfsS5ss41A1uxCdvkKtdxNoG2dPuIA_rFfiEKUU/edit?ts=6025b916)

| **Feature/Important Date** | **Delivered by:** |
| --- | --- |
| Sign In/Sign Out | February 4, 2021 |
| Email Sign In/Sign Out + Homepage Design | February 11, 2021 |
| Homepage + Make a question/See questions on Homepage | February 18, 2021 |
| Profile Page, Local Feed/Trending Feed | February 25, 2021 |
| MVP - Consisting of:
- Sign In/Sign Out
- Profile Page
- Post a question/reply to a question
- Local Feed / International Feed
- All question stuff
 | February 27, 2021 |
| v1 Project | March 8, 2021 |
| Scool Project Done | April 12, 2021 |
| **BVCC Project Showcase** | **April 22, 2021** |

## **Stretch Features**

(f-feature ; b-bug)

f-Make user profile UI more cleaner for both looking at YOUR OWN profile and SOMEONE else&#39;s profile AND make sure profile fields can be changed and customized

f-Re-edit UI of making a post to match Figma design

f-Revamp edit question UI on QuestionFull Component

b-Go through EVERY SINGLE FILE and clean up with relevant comments/un-needed code and make code cleaner

b-Make question show up automatically when user clicks submit

b-Scroll questions into view

f-On Message, put in notification array.

Put a realtime function at app start. Have to manage multiple things (if a message comes in, or if something else happens, just do 1 thing)

b-Should Search filter through DB or only questions received on the first query. (for now reads only questions received on first query)

b-Get User who made comment

f-Edit Comment if you&#39;re the user who made it

f-Delete Comment if you&#39;re the user who made it

b-Fix Date() format on DM&#39;s messages. Looks kinda off. Fix UI

b-On the phone, the screen looks very large. Scale the size down and just do a media query to scale the size down of the question part. Use ems/rems on things that NEED TO BE RESIZED if a phone is using them.

f-Reply to Comment (font awesome)

f-Don&#39;t hardcode the colleges that user can subscribe too. Get those colleges dynamically from firebase

b-Reformat error handling + simplify ways of doing actions to Firestore

b-Fix bug of Edit and Delete question not appearing in the right place

b-Delete conversation. NOTE all messages will be forever deleted.

b-Make header fixed. Right now it SCROLLS along with the rest of the page which we don&#39;t want… The header AND footer should be fixed.

Make sure to change when user JUST likes a question.

f-On QuestionFullPage component make user aware that they click into the title and body fields to edit. Look up conventions on that.

f-Ability to post questions anonymously.

f-Scroll back to top. Messaging componet

b-Cannot like your own question (see QuestionFullPage)…

f-Add ability to edit DM message. Delete DM message.

f-Add ability to reply to a comment

f-Add ability to change the LOCAL feed the user is subscribed to on the Profile Page.

f-Add ability to upload an image

b-Move sync to the right of the search bar.

f-Finish Profile functionality for information saved to be stored in Firebase

b-Users cannot use the same email to SignUp. But we go based off UID… so… I believe the only time the user might have the same email is when it shows up in the UI (ex. For a question.) Not for anything critical. So maybe allow the user to create a username to prevent the same email appearing in UI.

f-Change deletion alert to POPUP dialog when user attempting to delete a question

f-We don&#39;t want to query infinite questions. Query a certain amount of questions? 25? 30? User can click see more.

f-User cannot just automatically message you. They must accept your invitation.

b-Make Question width not take full width of screen

b(easy)-On Home and Trending Page, the link to go to a user&#39;s page is taking up tooo much width. The click area is too big

f-Add ability to FLAG question/comment

b-Stop query to Firebase to get questions every time goes to Home/Trending page

Each Question Collection gets a last updated attribute.

On App load, we init localQuestions state or globalQuestions state to NULL and GRAB questions and fill them.

The Client checks if that certain state

DO SAME FOR TRENDING PAGE!!!!

Use a listener. Instead of making repeated requests to Firebase. We set our listener ONCE! This does incur cost, but each time a user refreshes the page WE HAVE TO KNOW if there is a new question there. How else will the client know if the user made a requests? Well we could just ask the user to sync… Actually that might be better! Why not just have a sync button, the user clicks it and is now able to make requests for the questions again. You know what, we could have the questions state be PREFILLED from the LAST time the user called it. Then if the user clicked SYNC just prefill it.

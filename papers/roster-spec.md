# Roster Management Feature Specification
Version: 1.0.0

Almost every feature of the application relies on a roster of members
in some way. Members attend events, receive emails, and use the
software. Managing the roster is a key feature of the software, and
arguably the primary feature. To that end, there will be a tab
dedicated to roster management, which will allow users with the
appropriate privileges to (1) add and remove members, (2) edit user
information, including assigning and removing roles, (3) view, search,
and filter the roster, and (4) export the roster as a CSV for easy
sharing.

## Member Entry Data
Member entries will be stored in a database and include the following
information: Truman student ID, name, (optional) notes allowing at
least 500 characters of content, (optional) anticipated graduation term
(e.g. Fall 2025, Spring 2028), and roles. Event attendance will also be stored as described in the attendance specification.

## Roles
Roles will function as simple tags for users that can also grant
privileges and responsibilities (e.g. recurring reminders could be
assigned to a particular role). They can be stored as a simple list
of strings in the database, and a master list of all roles should also
be present in the database. The four required roles--President, Vice
President, Treasurer, and Secretary--will automatically be created.
Roles will have corresponding colors for color-coding, stored in the
database (not as actual hex codes--names will provide more freedom in
design). The President and Vice President will have full privileges
for all actions, while the Treasurer and Secretary will be allowed to
perform all but the most significant actions: removing other executive
board members (as members or from their positions). [Other actions may
be added to the list of restrictions as needs become clear].


## Member Entry Creation
The roster management page will contain a button to initiate member
creation flow, prompting the initiator to enter information about the
new member. There will be fields for all member entry fields described
above.

## Member Entry Viewing/Filtering
There will be a list of members which can surface all stored
information about each member. There will be a search bar associated
with the list that can search through all fields, prioritizing name
matches over matches to other text fields, and student ID matches over
other numerical matches. There will be filter options associated with
the list of members that can filter by role and attendance.

## Member Entry Editing
There will be an edit button associated with each member which brings
up an edit flow (very similar to the creation flow) with pre-populated
fields. This edit flow will have a cancel button and a save changes
button which function as one would expect. Removal of executive roles
can, by default, only be done by the President and Vice President.

## Member Entry Deletion
There will be a delete button associated with each member. Pressing the
button will bring up a confirmation interface element of some kind that
also reiterates the target member's name. Deletion of executive board
members can, by default, only be done by the President and Vice
President, and requires confirmation at least as robust as that of a
normal user. [A more robust confirmation may include manually typing
the target member's name].

## CSV Export
There will be a button that generates an Excel-dialect CSV file
containing a user-selected subset of the member information and allows
the user to save/download this file. This is to facilitate compliance
with requirements that student organizations submit rosters to the
university.

## Stretch Goals
- User creation prompts an initial email to the user confirming that they've been added to the roster/email list
- Signup form similar to attendance form that allows users to add themselves to the roster by following a link
- Periodic removal suggestion for members whose anticipated graduation date suggests they have graduated
- More filter options
- Sort options
- Column view options (hide or show columns, shift column sizes)
- Robust list interactions like multiple selection with checkboxes/ctrl+click/shift+click, mass editing/deletion when multiple members are selected

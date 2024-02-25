# Attendance Feature Specification
The purpose of the attendance feature is to support tracking of club members' attendance
of club events, and use this data to (1) classify members by activity, (2) semi-
automatically drop inactive members from email lists, and (3) view attendance data for
individual events. Administrators will be able to create event links (and corresponding
QR codes) to a check-in webpage hosted by the server software. Club members can visit
this webpage and enter their student ID to cause the system to note their attendance.
The attendance features are somewhat intertwined with the calendar
features, but this spec deals with only those features essential to the attendance
function, which has been selected for earlier implementation than the calendar
feature.

## Attendance Life Cycle
**Note**: The following section is intentionally vague about our database architecture,
because we haven't determined it yet. If you are architecting the database and make
a decision about something left vague below, please update this document accordingly.

### Attendogenesis
[
When the calendar feature is implemented, attendance will be tied to event creation.

There will be an option to mark events as attendable on creation, in editing, and
possibly from the attendance tab. But for now, attendable events are created from
the attendance tab by admins when they press a button. Events will be tracked in
SQL, and unambiguously identified by their creation date and time (down to the second). 
Event creation causes the url of the format:
`https://$server-ip-address/attendance?event=$event-id` to become a valid
attendance form. Submissions of valid student IDs to an attendance form add the event
to the list of recently-attended events in the appropriate SQL field
(probably a column of the users table). A link and corresponding QR code will be made
available for user convenience.
]

### Attendance Data Obsolescence
[
When the calendar feature is created, events may have to be considered separately
from attendance.

In most student orgs, there is no need to keep attendance data for more than a year.
There's no point in having a 50% attendance average for someone who attended most
meetings for their first 2 years at Truman but hasn't shown up in the past 18 months.
This necessitates a rolling drop-off. Attendance data should be ignored in calculations
once it is more than 1 year (defined as 365 days) old. It may be deleted, but this is
not required.
]

## Attendance Data and Users
Members will be categorized based on their attendance: >75% = frequent, >50% =
majority, >25% = infrequent, >=0% = inactive. This information will be calculated for
each user, updated whenever an event is created and whenever they create an event,
and treated as a role like `member` or `president`, allowing admins to view and manipulate
data using attendance as a factor. Admins will be prompted periodically to remove
low-attendance members from the relevant email list(s) if desired.

Member attendance will be calculated using a rolling average. Storing member join
date in the users database will be necessary to avoid penalizing students who joined
within the last year. The formula for the average is `A/T`, where `A` is the sum of events
attended since the join date or within the last year, whichever is smaller, and `T` is
the total number of attendable events that occurred within the same window.

## User Interface
There will be a dedicated attendance tab which centralizes attendance information.
This tab will contain an event creation button and a table of events and corresponding
attendance data, as well as the attendance form's link and QR code. A notification or
alert of some kind will periodically prompt admins to remove low-attendance users from
the email list. A summary of the removal action including the relevant list and all
affected members will be visible before action is confirmed.

## Stretch Goal Features
- Configurable attendance drop-off window
- Configurable member attendance categories

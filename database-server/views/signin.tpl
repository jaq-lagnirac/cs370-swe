<h1>Attendance Sign In</h1><br>
<form action="/signin" method="post">
	Date: <input type="text" name="date" value="{{date}}"/> <br>
	Name: <input type="text" name="name" value="{{name}}"> <br><br>
<input type="submit" value="Submit">
</form>

%if error == "name":
	<p>Error: No member named "{{name}}"</p>
%elif error == "date":
	<p>Error: No meeting on {{date}}</p>

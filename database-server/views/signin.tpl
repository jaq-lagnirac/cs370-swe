<h1>Attendance Sign In</h1><br>
<form action="/signin" method="post">
	<label for="date">Date: </label>
	<input type="text" name="date" value="{{date}}"/> <br>
	<label for="name">Name: </label>
	<input type="text" name="name" value="{{name}}"> <br><br>
<input type="submit" value="Submit">
</form>

%if error == "name":
	<p>Error: No member named "{{name}}"</p>
%elif error == "date":
	<p>Error: No meeting on {{date}}</p>

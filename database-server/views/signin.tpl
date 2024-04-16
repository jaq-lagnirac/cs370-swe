<h1>Attendance Sign In</h1>
<br>
<form action="/signin" method="post">
<table>
	<tr>
		<td><label for="date">Date: &nbsp</label></td>
		<td><input type="text" name="date" value="{{date}}"/></td>
	</tr>
	<tr>
		<td><label for="name">Name: &nbsp</label></td>
		<td><input type="text" name="name" value="{{name}}"></td>
	</tr>
</table>
	<br>
	<input type="submit" value="Submit">
</form>

%if error == "name":
	<p>Error: No member named "{{name}}"</p>
%elif error == "date":
	<p>Error: No meeting on {{date}}</p>

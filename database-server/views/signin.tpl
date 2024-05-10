<h1>Attendance Sign In</h1>
<br>
<form action="/signin" method="post">
<table>
	<tr>
		<td><label for="date">Date: &nbsp</label></td>
		<td><input type="text" name="date" value="{{date}}"/></td>
	</tr>
	<tr>
		<td><label for="email">Email: &nbsp</label></td>
		<td><input type="email" name="email" value="{{email}}"></td>
	</tr>
</table>
	<br>
	<input type="submit" value="Submit">
</form>

%if error == "email":
	<p>Error: No member found with email "{{email}}"</p>
%elif error == "date":
	<p>Error: No meeting on {{date}}</p>

<h1>Member Sign Up Form</h1>
<br>
<form action="/signup" method="post">
<table>
	<tr>
		<td><label for="name">Name* &nbsp</label></td>
		<td><input type="text" name="name"/></td>
	</tr>
	<tr>
		<td><label for="email">Email Address* &nbsp</label></td>
		<td><input type="email" name="email"></td>
	</tr>
	<tr>
		<td><label for="id">Banner ID* &nbsp</label></td>
		<td><input type="number" name="id"></td>
	</tr>
	<tr>
		<td><label for="note">Additional Notes &nbsp</label></td>
		<td><input type="text" name="note"></td>
	</tr>
</table>
	<br>
	<input type="submit" value="Submit">
</form>	

%if error == "id":
	<p>Error: A member already exists with that banner ID</p>
%elif error == "email":
	<p>Error: A member already exists with that email address</p>
%elif error == "empty":
	<p>Error: All required fields (*) must be filled</p>

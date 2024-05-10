<h1>Unsubscribe from Email List</h1>
<br>
<form action="/leave" method="post">
<table>
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

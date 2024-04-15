<h1>Member Sign Up Form</h1> <br>
<form action="/signup" method="post">
	<label for="name">Name: </label>
	<input type="text" name="name"/> <br>
	<label for="email">Email Address: </label>
	<input type="email" name="email"> <br>
	<label for="id">Banner ID: </label>
	<input type="number" name="id"> <br>
	<label for="note">Additional Notes: </label>
	<input type="text" name="note"> <br><br>
	<input type="submit" value="Submit">
</form>	

%if error == "id":
	<p>Error: A member already exists with that banner ID</p>

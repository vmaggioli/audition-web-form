<?php

include("../../config/db_config.php");
header("Refresh:2; url=http://web.ics.purdue.edu/~cmilhaup/public/auditions.html");

try {
	$conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
	echo "Connection failed: " . $e->getMessage() . "<br>";
}

//works with just 1 entry per person
$date = date('Y-m-d H:i:s', time());
$student_leader = $_POST["leader"];
$student = $_POST["student"];
$criteria = $_POST['criteria'];
$difference = $_POST['change'];
$comments = $_POST["comments"];
 
$sql = "INSERT INTO test VALUES ('$student_leader', '$student', '$criteria',
	'$difference', '$comments', '$date');";

try {
    $conn->exec($sql);
	echo "Records added successfully.";
} catch(PDOException $e) {
    echo "ERROR: Could not process request.<br>";
	echo $e->getMessage();
}
 
// close connection
$conn = null;

?>

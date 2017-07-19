<?php
include("../../config/db_config.php");
header("Refresh:2; url=http://web.ics.purdue.edu/~cmilhaup/public/auditions.html");
//echo "In script.</br>";

try {
	$conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
	echo "Connection failed: " . $e->getMessage() . "</br>";
}

$count = $_POST["counter"];
//echo "Count: " . $count . "</br>";

for ($i=0; $i<$count; $i++) {
	$date = date('Y-m-d H:i:s', time());
	$student_leader = $_POST["leader"];
	$student = $_POST["student"];
	$criteria = $_POST["criteria" . $count];
	$difference = $_POST["change" . $count];
	$comments = $_POST["comments" . $count];

	try {
		$sql = $conn->prepare("INSERT INTO test VALUES (:SL, :STUDENT, :CRITERIA,
			:DIFFERENCE, :COMMENTS, :DATE)");
		$sql->bindParam(':SL', $student_leader);
		$sql->bindParam(':STUDENT', $student);
		$sql->bindParam(':CRITERIA', $criteria);
		$sql->bindParam(':DIFFERENCE', $difference);
		$sql->bindParam(':COMMENTS', $comments);
		$sql->bindParam(':DATE', $date);

	    $sql->execute();
		echo "Records added successfully.";

	} catch(PDOException $e) {
	    echo "ERROR: Could not process request.<br>";
		echo $e->getMessage();
	}
}

// close connection
$conn = null;

?>

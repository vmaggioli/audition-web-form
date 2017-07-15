<?php
include("../../config/db_config.php");
/*$link = mysqli_connect($host, $username, $password, $db_name, $db_table);

if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
*/

//works with just 1 entry per person

echo "Form:";
echo $_POST["leader"];
echo $_POST["student"];
echo $_POST["criteria"];
echo $_POST["change"];
echo $_POST["comments"];
 
$student_leader = mysqli_real_escape_string($link, $_REQUEST['leader']);
$student = mysqli_real_escape_string($link, $_REQUEST['student']);
$criteria = mysqli_real_escape_string($link, $_REQUEST['criteria']);
$change = mysqli_real_escape_string($link, $_REQUEST['change']);
$comments = mysqli_real_escape_string($link, $_REQUEST['comments']);
 
$sql = "INSERT INTO persons (first_name, last_name, email) VALUES ('$first_name', '$last_name', '$email')";
if(mysqli_query($link, $sql)){
    echo "Records added successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
 
// close connection
mysqli_close($link);
header("Refresh:0");

?>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>pokenantes</title>
    <link rel="stylesheet" href="css/jquery-ui.css">
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

Hello gang!

</body>

<script src="js/plugins/jquery.js" type="text/javascript"></script>
<script src="js/plugins/jquery-ui.js" type="text/javascript"></script>
<script src="js/model.js" type="text/javascript"></script>
<script src="js/view.js" type="text/javascript"></script>
<script src="js/controller.js" type="text/javascript"></script>

<script>
  var model = new Model();
  var view = new View(model);
  var controller = new Controller(view, model);
</script>

</html>
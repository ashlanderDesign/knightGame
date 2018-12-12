var Menu = {
  isActive : true,
  username : "",
}

$(".enter").on("click", ()=>{
  if($(".inputUsername").val() != ""){
    $(".menu").fadeOut("slow");
    $("#canvas").removeClass("hidden");
    Menu.username = $(".inputUsername").val();
    Menu.isActive = false;
  } else {
    $(".error").fadeIn();
    setTimeout(function () {
      $(".error").fadeOut();
    }, 1000);
  }
})

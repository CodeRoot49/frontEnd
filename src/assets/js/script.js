function goBack() {
    window.history.back();
}
/*
try {
    //variable foto 
    var td = document.getElementById("saveImg");
    var picture;
    //obteniendo foto 
    var picturCp = document.getElementById("picture");

    picturCp.onchange = function(e) {
        readFile(e);
    };

    function readFile(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file.target.files[0]);
        try {
            td.firstChild.remove();
        } catch (Ex) {

        }

        var pictureSave = document.createElement("input");
        pictureSave.type = "hidden";
        pictureSave.name = "Foto";
        reader.onload = function() {
            picture = reader.result;
            pictureSave.value = reader.result;
        };
        td.appendChild(pictureSave);
    }
} catch (Exception) {
    console.log(Exception)
}*/
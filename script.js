let data = document.getElementById("text-field"); // get input field
let buttons = document.getElementsByClassName("command-btn"); // get command buttons
let saveButon = document.getElementById("save-button"); // get save button
let loadFileButton = document.getElementById("load-file-btn"); // get load file button
let fileInput = document.getElementById("file-input-hidden"); // get file input
let fileNameInput = document.getElementById("file-name"); // get file name input

// add event listeners to command buttons
for (let button of buttons) {
    button.addEventListener("click", () => {
        command = button.dataset.command; // get command from button
        document.execCommand(command, false, null); // execute the button command
        data.focus(); // get the focus back on the input field
    });
}

// load file button handler
loadFileButton.addEventListener("click", () => {
    fileInput.click(); // if load file clicked use fileInput to get file from local machine
});

// fileInput handler - reading file from local machine
fileInput.addEventListener("change", () => {
    const reader = new FileReader();
    reader.readAsText(fileInput.files[0]); // read loaded file
    reader.onload = () => {
        data.innerHTML = reader.result; // set text field to new text from file
    };
});

// handle save button
saveButon.addEventListener("click", () => {
    let text = data.innerHTML; // get text from text field
    saveFile(text); // save text in file
});

// downlaod fnc
saveFile = (data) => {
    // file setting
    const text = data; // text to save

    // set file name
    let name = "text.json";
    if (fileNameInput.value.length > 0) {
        name = fileNameInput.value + ".json"; // set name to typed by user if anything is typed, otherwise it stays text.json
    }
    const type = "text/plain"; // set type

    // create file
    const a = document.createElement("a"); // create temp element
    const file = new Blob([text], { type: type }); // create new blob of type text/plain with data from text field
    a.href = URL.createObjectURL(file); // add href to temp element
    a.download = name; //set download attribute in temp element
    document.body.appendChild(a); // add temp element to document
    a.click(); // click on element to download it
    a.remove(); // remove created element
};

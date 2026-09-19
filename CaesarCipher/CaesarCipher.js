
async function getBaconipsum() {
    // Build the API call
    let apiString = "https://baconipsum.com/api/";

    let theNewParagraphs = document.getElementById("newParagraphs").value;
    let theParagraphType = document.getElementById("paragraphType").value;
    let theAlgorithmNumber = document.getElementById("algorithmNumber").value;

    apiString = apiString + "?type=" + theParagraphType + "&paras=" + theNewParagraphs;

    // Make the API call
    let response = await fetch(apiString);

    // Read the response as JSON
    let jsonData = await response.json();

    // Clear previous results
    document.getElementById("myRawData").innerHTML = "";
    document.getElementById("myFormattedData").innerHTML = "";
    document.getElementById("myEncryptedData").innerHTML = "";

    // Display raw JSON
    document.getElementById("myRawData").textContent = JSON.stringify(jsonData);

    // Display formatted paragraphs
    for (let para in jsonData) {
        document.getElementById("myFormattedData").innerHTML += "<p>" + jsonData[para] + "</p>";
    }

    // Choose the encryption algorithm
    let encryptedData;

    if (theAlgorithmNumber == 1) {
        encryptedData = encryptionAlgo1(jsonData);
    }
    else {
        encryptedData = encryptionAlgo2(jsonData);
    }

    // Display encrypted paragraphs
    document.getElementById("myEncryptedData").innerHTML = encryptedData;

    return true;
}


// Algorithm 1: Replace vowels with numbers
function encryptionAlgo1(jsonData) {
    let encryptedStr = "";

    // Loop through each paragraph
    for (let para in jsonData) {

        let text = jsonData[para];

        // Loop through each character
        for (let i = 0; i < text.length; i++) {

            let char = text[i];

            if (char == "a" || char == "A") {
                encryptedStr += "1";
            }
            else if (char == "e" || char == "E") {
                encryptedStr += "2";
            }
            else if (char == "i" || char == "I") {
                encryptedStr += "3";
            }
            else if (char == "o" || char == "O") {
                encryptedStr += "4";
            }
            else if (char == "u" || char == "U") {
                encryptedStr += "5";
            }
            else {
                encryptedStr += char;
            }
        }

        // Add a paragraph break
        encryptedStr += "<br><br>";
    }

    return encryptedStr;
}


// Algorithm 2: Shift letters by 1
function encryptionAlgo2(jsonData) {
    let encryptedStr = "";

    // Loop through each paragraph
    for (let para in jsonData) {

        let text = jsonData[para];

        // Loop through each character
        for (let i = 0; i < text.length; i++) {

            let char = text[i];

            if (char >= "a" && char <= "z") {
                if (char == "z") {
                    encryptedStr += "a";
                }
                else {
                    encryptedStr += String.fromCharCode(char.charCodeAt(0) + 1);
                }
            }
            else if (char >= "A" && char <= "Z") {
                if (char == "Z") {
                    encryptedStr += "A";
                }
                else {
                    encryptedStr += String.fromCharCode(char.charCodeAt(0) + 1);
                }
            }
            else {
                encryptedStr += char;
            }
        }

        // Add a paragraph break
        encryptedStr += "<br><br>";
    }

    return encryptedStr;
}
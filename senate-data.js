//document.getElementById("senate-data").innerHTML = "<thead><th> Senator </th><th> Party Affiliation </th><th> State </th><th> Years In Office </th><th> Total Votes </th><th> % Of Voters w/ Party </th></thead>";

//for(var i = 0; i < membersArr.length; i++){
//    document.getElementById("senate-data").innerHTML += "<tr><td>" + "<a href=" + membersArr[i].url + ">" + membersArr[i].first_name + " " +  (membersArr[i].middle_name || "") + " " + membersArr[i].last_name + "</td>" + "<td>" + membersArr[i].party + "</td>" + "<td>" + membersArr[i].state + "</td>" + "<td>" + membersArr[i].seniority + "</td>" + "<td>" + membersArr[i].total_votes + "<td>" + membersArr[i].votes_with_party_pct + "%" + "</td></tr>";
//       
//}

var membersArr = data.results[0].members;
createTable(membersArr)
addList()

function createTable(array) {

    document.getElementById("senate-data").innerHTML = "";


    for (var i = 0; i < array.length; i++) {

        var row = document.createElement("tr");
        var link = document.createElement("a");



        link.textContent = array[i].first_name + " " + (array[i].middle_name || "") + " " + array[i].last_name;
        link.setAttribute("href", array[i].url)


        row.insertCell().append(link);
        var cell2 = document.createElement("td");
        cell2.setAttribute("party", array[i].party);
        cell2.innerHTML = array[i].party;
        row.append(cell2);
        row.insertCell().innerHTML = array[i].state;
        row.insertCell().innerHTML = array[i].seniority;
        row.insertCell().innerHTML = array[i].total_votes;
        row.insertCell().innerHTML = array[i].votes_with_party_pct;


        document.getElementById("senate-data").append(row)

    }
}




document.getElementById("republicanValue").addEventListener("click", checkboxFilter);
document.getElementById("democratValue").addEventListener("click", checkboxFilter);
document.getElementById("independentValue").addEventListener("click", checkboxFilter);
document.getElementById("stateSelect").addEventListener("change", checkboxFilter)




function checkboxFilter() {
    //cbxs = checkbox
    var cbxs = document.querySelectorAll("input[name=party]:checked");
    var finalArray = Array.from(cbxs).map(el => el.value);

    var filteredMembers = [];

    document.getElementById("senate-data").innerHTML = "";

    //    console.log(finalArray)
    if (cbxs.length === 0) {
        selectFilter(membersArr)
    } else {
        for (var j = 0; j < membersArr.length; j++) {
            for (var i = 0; i < finalArray.length; i++) {
                if (membersArr[j].party === finalArray[i]) {
                    filteredMembers.push(membersArr[j]);
                }
            }
        }
        selectFilter(filteredMembers)
    }



}



function addList() {
    var select = document.getElementById("stateSelect");

    var repeatedStates = [];
    var nonDuplicateStates = [];

    for (var i = 0; i < membersArr.length; i++) {
        repeatedStates.push(membersArr[i].state)
    }

    for (var i = 0; i < repeatedStates.length; i++) {
        if (!nonDuplicateStates.includes(repeatedStates[i])) {
            nonDuplicateStates.push(repeatedStates[i])
        }

    }

    nonDuplicateStates.sort()

    for (var i = 0; i < nonDuplicateStates.length; i++) {
        var option = document.createElement("option");
        option.text = nonDuplicateStates[i];
        select.append(option);


    }
}





function selectFilter(filteredArray) {
    console.log(filteredArray)

    var selectedState = document.getElementById("stateSelect").value

    var filteredStates = [];



    if (selectedState == "") {
        console.log("None")
        createTable(filteredArray)
    } else {
        console.log(selectedState)
        for (var i = 0; i < filteredArray.length; i++) {

            if (filteredArray[i].state === selectedState) {
                filteredStates.push(filteredArray[i]);
            }
        }
        createTable(filteredStates)
    }
    console.log(filteredStates)
}


//statistics





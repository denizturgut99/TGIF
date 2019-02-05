//document.getElementById("senate-data").innerHTML = "<thead><th> Senator </th><th> Party Affiliation </th><th> State </th><th> Years In Office </th><th> Total Votes </th><th> % Of Voters w/ Party </th></thead>";

//for(var i = 0; i < membersArr.length; i++){
//    document.getElementById("senate-data").innerHTML += "<tr><td>" + "<a href=" + membersArr[i].url + ">" + membersArr[i].first_name + " " +  (membersArr[i].middle_name || "") + " " + membersArr[i].last_name + "</td>" + "<td>" + membersArr[i].party + "</td>" + "<td>" + membersArr[i].state + "</td>" + "<td>" + membersArr[i].seniority + "</td>" + "<td>" + membersArr[i].total_votes + "<td>" + membersArr[i].votes_with_party_pct + "%" + "</td></tr>";
//       
//}

var membersArr = data.results[0].members;

function createTable(array) {
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

createTable(membersArr)


// Filter

// var partyValues = [document.getElementById("republicanValue").value, document.getElementById("democratValue").value, document.getElementById("independentValue").value]
// 
// var filterParties = [];
// 
//var partyFilter = () => {
//    
//    
//    if(document.getElementById("republicanValue").checked = true){
//    partyValues.filter(document.getElementById("republicanValue").value)
//    
//    } else if (document.getElementById("democraticValue").checked = true){
//    partyValues.filter(document.getElementById("democraticValue").value)
//    
//    } else if (document.getElementById("independentValue").checked = true){
//    partyValues.filter(document.getElementById("independentValue").value)
//    
//    }
//    return filterParties.push(partyValues)
//    
//}

document.getElementById("republicanValue").addEventListener("change", saySomething);
document.getElementById("democratValue").addEventListener("change", saySomething);
document.getElementById("independentValue").addEventListener("change", saySomething);




function saySomething() {
//cbxs = checkbox
    var cbxs = document.querySelectorAll("input[name=party]:checked");
    var finalArray = Array.from(cbxs).map(el => el.value);

    var filteredMembers = [];

    document.getElementById("senate-data").innerHTML = "";

    //    console.log(finalArray)
    if (cbxs.length === 0) {
        return createTable(membersArr)
    } else {
        for (var j = 0; j < membersArr.length; j++) {
            for (var i = 0; i < finalArray.length; i++) {
                if (membersArr[j].party === finalArray[i]) {
                    filteredMembers.push(membersArr[j]);
                }
            }
        }
    }

    return createTable(filteredMembers)



}









/*
var partyCheck = () => {
    console.log(document.getElementById("republicanValue").value)
    console.log(document.getElementById("democratValue").value)
    console.log(document.getElementById("independentValue").value)
    
}


var partyFilter = () => {
    var parties = membersArr[i].party;
    
    if(document.getElementById("republicanValue").value == parties.value){
        return parties.filter(document.getElementById("democratValue").value && document.getElementById("independentValue").value)
    } else if (document.getElementById("democratValue").value == parties.value){
        parties.filter(document.getElementById("republicanValue").value && document.getElementById("independentValue").value)
    } else {
        parties.filter(document.getElementById("republicanValue").value && document.getElementById("democratValue").value)
    }
    
}
*/

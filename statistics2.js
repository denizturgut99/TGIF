var membersArr = data.results[0].members;
var statistics = {
    "parties": [{
        "name": "Democrats",
        "numOfReps": 0,
        "pcntg_voted_w_par": 0,
    }, {
       "name": "Republicans",
       "numOfReps": 0,
       "pcntg_voted_w_par": 0,
    }, {
       "name": "Independent",
       "numOfReps": 0,
       "pcntg_voted_w_par": 0,
    }, ], 
        "disloyal": null,
        "loyal": null,
        "num_party_votes": 0,
        "percentage_party_votes": 0,
        "least_missed_votes": null,
        "most_missed_votes": null,
        "percentage_missed_votes": 0,
        "least_attendance": 0,
    
 
}

var partiesArr = statistics.parties;



var repCount = 0;
var demCount = 0;
var indCount = 0;
for (var i = 0; i < membersArr.length; i++) {
    if (membersArr[i].party == "R") {
        repCount++;
    }
}

for (var i = 0; i < membersArr.length; i++) {
    if (membersArr[i].party == "D") {
        demCount++;
    }
}

for (var i = 0; i < membersArr.length; i++) {
    if (membersArr[i].party == "I") {
        indCount++;
    }
}

statistics.parties[0].numOfReps = demCount;
statistics.parties[1].numOfReps = repCount;
statistics.parties[2].numOfReps = indCount;



var percentage_voted_w_dem = 0;
var percentage_voted_w_rep = 0;
var percentage_voted_w_ind = 0;

for (var i = 0; i < membersArr.length; i++) {
    if (membersArr[i].party == "D") {
        percentage_voted_w_dem += membersArr[i].votes_with_party_pct / demCount
    }

}
for (var i = 0; i < membersArr.length; i++) {
    if (membersArr[i].party == "R") {
        percentage_voted_w_rep += membersArr[i].votes_with_party_pct / repCount
    }

}
for (var i = 0; i < membersArr.length; i++) {
    if (membersArr[i].party == "I") {
        percentage_voted_w_ind += membersArr[i].votes_with_party_pct / indCount
    }

}

//var sum = 0;
//for(var i = 0; i < membersArr.length; i++){
//    if(membersArr[i].votes_with_party_pct < 100){
//        sum += membersArr[i].votes_with_party_pct / 10
//    }
//}

var allValues = [];

for (var i = 0; i < membersArr.length; i++){
    if(membersArr[i].votes_with_party_pct < 100){
        allValues.push(membersArr[i])
    }
};
//for (var i = 0; i < membersArr.length; i++){
//    allValues.push(membersArr[i].votes_with_party_pct.sort())
//}

var sortedValues = allValues.sort((a, b) => a.votes_with_party_pct > b.votes_with_party_pct ? 1 : a.votes_with_party_pct < b.votes_with_party_pct ? -1 : 0)

//var sortedMissedVotes = allValues.sort((a, b) => a.missed_votes_pct > b.missed_votes_pct ? 1 : a.missed_votes_pct < b.missed_votes_pct ? -1 : 0)

var tenpct = membersArr.length/10

//var leastMissedVotes = sortedMissedVotes.slice(0,tenpct)
//var mostMissedVotes = sortedMissedVotes.slice(membersArr.length - tenpct, membersArr.length)

var bottom10 = sortedValues.slice(0, tenpct)
var top10 = sortedValues.slice(membersArr.length - tenpct, membersArr.length)


//statistics.least_missed_votes = leastMissedVotes;
//statistics.most_missed_votes = mostMissedVotes;
statistics.disloyal = bottom10;
statistics.loyal = top10;
statistics.parties[0].pcntg_voted_w_par = Math.round(percentage_voted_w_dem);
statistics.parties[1].pcntg_voted_w_par = Math.round(percentage_voted_w_rep);
statistics.parties[2].pcntg_voted_w_par = Math.round(percentage_voted_w_ind);


function numTable(){
    document.getElementById("senate-glance").innerHTML = "";
    for(var i = 0; i < partiesArr.length; i++){
        var row = document.createElement("tr");
        var data = document.createElement("td");
        
        row.insertCell().innerHTML = partiesArr[i].name;
        row.insertCell().innerHTML = partiesArr[i].numOfReps;
        row.insertCell().innerHTML = partiesArr[i].pcntg_voted_w_par;
        
        document.getElementById("senate-glance").append(row)
    }
}
numTable();

function loyalTable(){
    document.getElementById("mostLoyal").innerHTML = "";
    for(var i = 0; i < statistics.loyal.length; i++){
        var row = document.createElement("tr");
        var link = document.createElement("a");
        
        link.textContent = statistics.loyal[i].first_name + " " + (statistics.loyal[i].middle_name || "") + " " + statistics.loyal[i].last_name;
        link.setAttribute("href", statistics.loyal[i].url);
        row.insertCell().append(link);
        
        row.insertCell().innerHTML = statistics.loyal[i].total_votes;
        row.insertCell().innerHTML = statistics.loyal[i].votes_with_party_pct;
        
        document.getElementById("mostLoyal").append(row)
    }
}
loyalTable();

function disloyalTable(){
    document.getElementById("leastLoyal").innerHTML = "";
    for(var i = 0; i < statistics.disloyal.length; i++){
        var row = document.createElement("tr");
        var link = document.createElement("a");
        
        link.textContent = statistics.disloyal[i].first_name + " " + (statistics.disloyal[i].middle_name || "") + " " + statistics.disloyal[i].last_name;
        link.setAttribute("href", statistics.disloyal[i].url);
        row.insertCell().append(link);
        
        row.insertCell().innerHTML = statistics.disloyal[i].total_votes;
        row.insertCell().innerHTML = statistics.disloyal[i].votes_with_party_pct;
        
        document.getElementById("leastLoyal").append(row)
    }
}
disloyalTable();
window.onload = () => {
    var vueTable = new Vue({
        el: "#app",
        data: {
            membersData: [{}],
            leastEngaged: [{}],
            mostEngaged: [{}],

        },
        methods: {
            callAllFuncs() {
                if (document.getElementById("house")) {
                    var url = "https://api.propublica.org/congress/v1/113/house/members.json"
                } else if (document.getElementById("senate")) {
                    var url = "https://api.propublica.org/congress/v1/113/senate/members.json"
                };


                var membersArr;
                fetch(url, {
                        mode: "cors",
                        headers: {
                            "X-API-KEY": "1JHaip98mxk1GfLH3C0VteWFXyrg1JtJ4QT3QjjP",
                        }
                    })
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (json) {
                        console.log(json)
                        membersArr = json.results[0].members;
                        vueTable.membersData = statistics.parties;

                        callAll();
                        vueTable.leastEngaged = statistics.most_missed_votes;
                        vueTable.mostEngaged = statistics.least_missed_votes;
                        removeLoader()
                        //            createTable(membersArr)
                        //            addList()
                    }).catch(error => console.log(error))


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


                function callAll() {
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


                    for (var i = 0; i < membersArr.length; i++) {
                        if (membersArr[i].votes_with_party_pct < 100) {
                            allValues.push(membersArr[i])
                        }
                    };
                    var sortedValues = allValues.sort((a, b) => a.votes_with_party_pct > b.votes_with_party_pct ? 1 : a.votes_with_party_pct < b.votes_with_party_pct ? -1 : 0)

                    var sortedMissedVotes = allValues.sort((a, b) => a.missed_votes_pct > b.missed_votes_pct ? 1 : a.missed_votes_pct < b.missed_votes_pct ? -1 : 0)

                    var tenpct = membersArr.length / 10

                    var leastMissedVotes = sortedMissedVotes.slice(0, tenpct)
                    var mostMissedVotes = sortedMissedVotes.slice(membersArr.length - tenpct, membersArr.length)

                    //var bottom10 = sortedValues.slice(0, tenpct)
                    //var top10 = sortedValues.slice(membersArr.length - tenpct, membersArr.length)

                    statistics.parties[0].numOfReps = demCount;
                    statistics.parties[1].numOfReps = repCount;
                    statistics.parties[2].numOfReps = indCount;
                    statistics.least_missed_votes = leastMissedVotes;
                    statistics.most_missed_votes = mostMissedVotes;
                    //statistics.disloyal = bottom10;
                    //statistics.loyal = top10;
                    statistics.parties[0].pcntg_voted_w_par = Math.round(percentage_voted_w_dem);
                    statistics.parties[1].pcntg_voted_w_par = Math.round(percentage_voted_w_rep);
                    statistics.parties[2].pcntg_voted_w_par = Math.round(percentage_voted_w_ind);

                }

                function removeLoader() {
                    document.getElementById("loader").remove();
                    document.getElementById("loader1").remove();
                    document.getElementById("loader2").remove();
                }
            }
        }
    });

    vueTable.callAllFuncs()







    //    function numTable() {
    //        document.getElementById("senate-glance").innerHTML = "";
    //        for (var i = 0; i < partiesArr.length; i++) {
    //            var row = document.createElement("tr");
    //            var data = document.createElement("td");
    //
    //            row.insertCell().innerHTML = partiesArr[i].name;
    //            row.insertCell().innerHTML = partiesArr[i].numOfReps;
    //            row.insertCell().innerHTML = partiesArr[i].pcntg_voted_w_par;
    //
    //            document.getElementById("senate-glance").append(row)
    //        }
    //    }
    //    //numTable();
    //
    //    function leastEngagedTable() {
    //        document.getElementById("leastEngaged").innerHTML = "";
    //        for (var i = 0; i < statistics.most_missed_votes.length; i++) {
    //            var row = document.createElement("tr");
    //            var link = document.createElement("a");
    //
    //            link.textContent = statistics.most_missed_votes[i].first_name + " " + (statistics.most_missed_votes[i].middle_name || "") + " " + statistics.most_missed_votes[i].last_name;
    //            link.setAttribute("href", statistics.most_missed_votes[i].url)
    //            row.insertCell().append(link);
    //
    //            row.insertCell().innerHTML = statistics.most_missed_votes[i].missed_votes;
    //            row.insertCell().innerHTML = statistics.most_missed_votes[i].missed_votes_pct;
    //
    //            document.getElementById("leastEngaged").append(row)
    //        }
    //    }
    //    //leastEngagedTable();
    //
    //    function mostEngagedTable() {
    //        document.getElementById("mostEngaged").innerHTML = "";
    //        for (var i = 0; i < statistics.least_missed_votes.length; i++) {
    //            var row = document.createElement("tr");
    //            var link = document.createElement("a");
    //
    //            link.textContent = statistics.least_missed_votes[i].first_name + " " + (statistics.least_missed_votes[i].middle_name || "") + " " + statistics.least_missed_votes[i].last_name;
    //            link.setAttribute("href", statistics.least_missed_votes[i].url);
    //            row.insertCell().append(link);
    //
    //            row.insertCell().innerHTML = statistics.least_missed_votes[i].missed_votes;
    //            row.insertCell().innerHTML = statistics.least_missed_votes[i].missed_votes_pct;
    //
    //            document.getElementById("mostEngaged").append(row)
    //        }
    //    }
    //mostEngagedTable();

}

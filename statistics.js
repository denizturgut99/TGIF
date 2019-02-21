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
                        removeLoader();
                        hideTable();

                        //            createTable(membersArr)
                        //            addList()
                    }).catch(error => console.log(error))


                var statistics = {
                    "parties": [{
                        "name": "Democrats",
                        "numOfReps": 0,
                        "pcntg_voted_w_par": 0,
                        "pcntg": "%",
    }, {
                        "name": "Republicans",
                        "numOfReps": 0,
                        "pcntg_voted_w_par": 0,
                        "pcntg": "%",
    }, {
                        "name": "Independent",
                        "numOfReps": 0,
                        "pcntg_voted_w_par": 0,
                        "pcntg": "%",

    }, {
                        "name": "Total",
                        "numOfReps": 0,
                        "pcntg_voted_w_par": 0,
                        "pcntg": "%",

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
                    var totalNum = 0;

                    for (var i = 0; i < membersArr.length; i++) {
                        if (membersArr[i].party == "R") {
                            repCount++;
                            totalNum++;
                        }
                    }

                    for (var i = 0; i < membersArr.length; i++) {
                        if (membersArr[i].party == "D") {
                            demCount++;
                            totalNum++;
                        }
                    }

                    for (var i = 0; i < membersArr.length; i++) {
                        if (membersArr[i].party == "I") {
                            indCount++;
                            totalNum++;
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

                    var percentageNums = [percentage_voted_w_dem, percentage_voted_w_rep, percentage_voted_w_ind];
                    var sumOfNums;
                    var averageOfNums;

                    percentageNums = percentageNums.filter(function (percentageNums) {
                        return percentageNums > 0
                    });
                    sumOfNums = percentage_voted_w_dem + percentage_voted_w_rep + percentage_voted_w_ind;
                    averageOfNums = sumOfNums / percentageNums.length;


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
                    var leastMissedNonDup;
                    var mostMissedNonDup;

                    for (var i = 0; i < membersArr.length; i++) {
                        if (membersArr[i].missed_votes_pct == leastMissedVotes[leastMissedVotes.length - 1].missed_votes_pct) {
                            leastMissedVotes.push(membersArr[i])
                            leastMissedNonDup = [...new Set(leastMissedVotes)]

                        }
                    };

                    for (var j = 0; j < membersArr.length; j++) {
                        if (membersArr[j].missed_votes_pct == mostMissedVotes[mostMissedVotes.length - 1].missed_votes_pct) {
                            mostMissedVotes.push(membersArr[j])
                            mostMissedNonDup = [...new Set(mostMissedVotes)]
                        }
                    }

                    statistics.parties[0].numOfReps = demCount;
                    statistics.parties[1].numOfReps = repCount;
                    statistics.parties[2].numOfReps = indCount;
                    statistics.parties[3].numOfReps = totalNum;
                    statistics.least_missed_votes = leastMissedNonDup;
                    statistics.most_missed_votes = mostMissedNonDup;
                    statistics.parties[0].pcntg_voted_w_par = Math.round(percentage_voted_w_dem);
                    statistics.parties[1].pcntg_voted_w_par = Math.round(percentage_voted_w_rep);
                    statistics.parties[2].pcntg_voted_w_par = Math.round(percentage_voted_w_ind);
                    statistics.parties[3].pcntg_voted_w_par = Math.round(averageOfNums);

                }

                function removeLoader() {
                    document.getElementById("loader").remove();
                    document.getElementById("loader1").remove();
                    document.getElementById("loader2").remove();
                }

                function hideTable() {
                    document.getElementById("table0").classList.remove("hiddenTable")
                    document.getElementById("table1").classList.remove("hiddenTable")
                    document.getElementById("table2").classList.remove("hiddenTable")
                }
            }
        }
    });

    vueTable.callAllFuncs()


}

var vueTable = new Vue({
    el: "#app",
    data: {
        membersData: [],
        partyData: [],
        memberState: "",
        checkboxes: [],
        stateDropdown: [],
        leastEngaged: [],
        mostEngaged: [],
        disloyalty: [],
        loyalty: [],

    },
    computed: {
        table() {
            //table is made according to the data that gets pushed in the "checkboxes" and "memberState", these keys are connected to html where when a button gets clicked it sends the value that it has and pushed into vue data
            return this.membersData.filter(member => {
                var party = this.checkboxes.includes(member.party) || this.checkboxes.length == 0;
                var states = this.memberState == member.state || this.memberState == "" || this.memberState == undefined;

                return party && states;
            })
        },
        nonDuplicatedStates() {

            //states are filtered to make sure there arent any duplicate states and then gets sorted from a to z
            var filteredStates = [];
            for (var i = 0; i < this.membersData.length; i++) {
                if (!filteredStates.includes(this.membersData[i].state)) {
                    filteredStates.push(this.membersData[i].state)
                }
            }
            return filteredStates.sort();
        }
    },
    methods: {
        callAllFuncs() {

            if (document.getElementById("house")) {
                var url = "https://api.propublica.org/congress/v1/113/house/members.json";
            } else if (document.getElementById("senate")) {
                var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
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
                    vueTable.membersData = json.results[0].members;
                    vueTable.memberState = json.results[0].members.state;
                    vueTable.partyData = statistics.parties;

                    //function is called after data is "ready"
                    callAll();

                    //after the main function is called rest of the data is transfered into their respected areas
                    vueTable.leastEngaged = statistics.most_missed_votes;
                    vueTable.mostEngaged = statistics.least_missed_votes;
                    vueTable.disloyalty = statistics.disloyal;
                    vueTable.loyalty = statistics.loyal;

                    removeLoader();
                    hideTable();
                    showNoResult();


                }).catch(error => console.log(error))

            //all of the statistics data gets pushed in here
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


    }, {
                    "name": "Total",
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
                //partiesArr is necessary to make sure data can be placed into different functions
                var partiesArr = statistics.parties;


                //counting the total number of representatives for each party and in total
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

                //percentages calculated according on how loyal the reps are to their sworn parties
                var percentage_voted_w_dem = 0;
                var percentage_voted_w_rep = 0;
                var percentage_voted_w_ind = 0;

                //for loop is used to take all of the needed "parties" and uses this to start a math equation to find the percentage
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

                //all percentage nums are placed into an array to make sure if the numbers are above 0 and can be used to calculate the median average of all parties
                var percentageNums = [percentage_voted_w_dem, percentage_voted_w_rep, percentage_voted_w_ind];
                var sumOfNums;
                var averageOfNums;

                percentageNums = percentageNums.filter(function (percentageNums) {
                    return percentageNums > 0
                });
                sumOfNums = percentage_voted_w_dem + percentage_voted_w_rep + percentage_voted_w_ind;
                averageOfNums = sumOfNums / percentageNums.length;


                //all of the values are taken
                var allValues = [];

                for (var i = 0; i < membersArr.length; i++) {
                    if (membersArr[i].votes_with_party_pct < 100) {
                        allValues.push(membersArr[i])
                    }
                };
                //all of the values that are taken get sorted going from smaller percentages to bigger percentages
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

                var bottom10 = sortedValues.slice(0, tenpct);
                var top10 = sortedValues.slice(membersArr.length - tenpct, membersArr.length);
                var bottom10NonDup;
                var top10NonDup;

                for (var i = 0; i < membersArr.length; i++) {
                    if (membersArr[i].votes_with_party_pct == bottom10[bottom10.length - 1].votes_with_party_pct) {
                        bottom10.push(membersArr[i]);
                        bottom10NonDup = [...new Set(bottom10)]
                    }
                }

                for (var j = 0; j < membersArr.length; j++) {
                    if (membersArr[j].votes_with_party_pct == top10[top10.length - 1].votes_with_party_pct) {
                        top10.push(membersArr[j]);
                        top10NonDup = [...new Set(top10)]
                    }
                }


                //all of the data that was acquired gets pushed into the statistics keys
                statistics.parties[0].numOfReps = demCount;
                statistics.parties[1].numOfReps = repCount;
                statistics.parties[2].numOfReps = indCount;
                statistics.parties[3].numOfReps = totalNum;
                statistics.least_missed_votes = leastMissedNonDup;
                statistics.most_missed_votes = mostMissedNonDup;
                statistics.disloyal = bottom10NonDup;
                statistics.loyal = top10NonDup;
                statistics.parties[0].pcntg_voted_w_par = Math.round(percentage_voted_w_dem);
                statistics.parties[1].pcntg_voted_w_par = Math.round(percentage_voted_w_rep);
                statistics.parties[2].pcntg_voted_w_par = Math.round(percentage_voted_w_ind);
                statistics.parties[3].pcntg_voted_w_par = Math.round(averageOfNums);


            }
            
            function removeLoader() {
//                document.getElementsByClassName("loading").remove()
                document.getElementById("loader").remove();
                if(!document.URL.includes("starter")){
                document.getElementById("loader1").remove();
                document.getElementById("loader2").remove();
                }
            }

            function hideTable() {
                document.getElementById("table0").classList.remove("hiddenTable");
                document.getElementById("table1").classList.remove("hiddenTable");
                document.getElementById("table2").classList.remove("hiddenTable");
            }

            function showNoResult() {
                var res = vueTable.table
                console.log(res)
                if (res.length == 0) {
                    document.getElementById("noValue").classList.remove("hiddenTable");
                }
            }


        },

    }
});

//FUNCTION CALLS
vueTable.callAllFuncs();

var vueTable = new Vue({
    el: "#app",
    data: {
        membersData: [],
        memberState: "",
        checkboxes: [],
        stateDropdown: [],


    },
    computed: {
        table() {
            return this.membersData.filter(member => {
                var party = this.checkboxes.includes(member.party) || this.checkboxes.length == 0;
                var states = this.memberState == member.state || this.memberState == "" || this.memberState == undefined;

                return party && states;
            })
        },
        nonDuplicatedStates() {

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


            //            setTimeout(function () {
            //                document.getElementById("loader").remove()
            //            }, 1000)

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
                    vueTable.membersData = json.results[0].members;
                    vueTable.memberState = json.results[0].members.state;
                    removeLoader()

                    //                        addList();

                }).catch(error => console.log(error))

            function removeLoader() {
                document.getElementById("loader").remove()
            }


        },

        //        removeLoader() {
        //            document.getElementById("filterTable").onload = function (){
        //                document.getElementById("loader").remove();
        //            }
        //        }
    }
});

//FUNCTION CALLS
vueTable.callAllFuncs();
//vueTable.removeLoader();
//    vueTable.setData();
//    vueTable.addList();
//    vueTable.checkboxFilter();
//    vueTable.activateListeners();
//    vueTable.selectFilter();




//statistics




//                document.getElementById("republicanValue").addEventListener("click", checkboxFilter);
//                document.getElementById("democratValue").addEventListener("click", checkboxFilter);
//                document.getElementById("independentValue").addEventListener("click", checkboxFilter);
//                document.getElementById("stateSelect").addEventListener("change", checkboxFilter);

//                function createTable(array) {
//
//                    document.getElementById("senate-data").innerHTML = "";
//
//
//                    for (var i = 0; i < array.length; i++) {
//
//                        var row = document.createElement("tr");
//                        var link = document.createElement("a");
//
//
//
//                        link.textContent = array[i].first_name + " " + (array[i].middle_name || "") + " " + array[i].last_name;
//                        link.setAttribute("href", array[i].url)
//
//
//                        row.insertCell().append(link);
//                        var cell2 = document.createElement("td");
//                        cell2.setAttribute("party", array[i].party);
//                        cell2.innerHTML = array[i].party;
//                        row.append(cell2);
//                        row.insertCell().innerHTML = array[i].state;
//                        row.insertCell().innerHTML = array[i].seniority;
//                        row.insertCell().innerHTML = array[i].total_votes;
//                        row.insertCell().innerHTML = array[i].votes_with_party_pct;
//
//
//                        document.getElementById("senate-data").append(row)
//
//                    }
//                }

//                function checkboxFilter() {
//
//                    //cbxs = checkbox
//                    var cbxs = document.querySelectorAll("input[name=party]:checked");
//                    var finalArray = Array.from(cbxs).map(el => el.value);
//
//                    var filteredMembers = [];
//
//                    document.getElementById("senate-data").innerHTML = "";
//
//                    //    console.log(finalArray)
//                    if (cbxs.length === 0) {
//                        selectFilter(membersArr)
//                    } else {
//                        for (var j = 0; j < membersArr.length; j++) {
//                            for (var i = 0; i < finalArray.length; i++) {
//                                if (membersArr[j].party === finalArray[i]) {
//                                    filteredMembers.push(membersArr[j]);
//                                }
//                            }
//                        }
//                        selectFilter(filteredMembers)
//                    }
//
//
//
//                }

//                function addList() {
//                    var select = document.getElementById("stateSelect");
//
//                    var repeatedStates = [];
//                    var nonDuplicateStates = [];
//
//                    for (var i = 0; i < membersArr.length; i++) {
//                        repeatedStates.push(membersArr[i].state)
//                    }
//
//                    for (var i = 0; i < repeatedStates.length; i++) {
//                        if (!nonDuplicateStates.includes(repeatedStates[i])) {
//                            nonDuplicateStates.push(repeatedStates[i])
//                        }
//
//                    }
//
//                    nonDuplicateStates.sort()
//
//                    for (var i = 0; i < nonDuplicateStates.length; i++) {
//                        var option = document.createElement("option");
//                        option.text = nonDuplicateStates[i];
//                        select.append(option);
//
//
//                    }
//                }

//                function selectFilter(filteredArray) {
//                    console.log(filteredArray)
//                    
//                    var selectedState = document.getElementById("stateSelect").value
//
//                    var filteredStates = [];
//
//
//
//                    if (selectedState == "") {
//                        console.log("None")
//                        createTable(filteredArray)
//                    } else {
//                        console.log(selectedState)
//                        for (var i = 0; i < filteredArray.length; i++) {
//
//                            if (filteredArray[i].state === selectedState) {
//                                filteredStates.push(filteredArray[i]);
//                            }
//                        }
//                        createTable(filteredStates)
//                    }
//                    console.log(filteredStates)
//                }

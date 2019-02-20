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
                    removeLoader();
                    hideTable();
                    showNoResult();

                    //                        addList();

                }).catch(error => console.log(error))

            function removeLoader() {
                document.getElementById("loader").remove()
            }

            function hideTable() {
                document.getElementById("table0").classList.remove("hiddenTable");
                document.getElementById("table1").classList.remove("hiddenTable");
                document.getElementById("table2").classList.remove("hiddenTable");
            }

            function showNoResult() {
                var res = vueTable.computed.table
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

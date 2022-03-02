
const PlayerTablePrefab = "<tr><td>[P1]</td><td>[P2]</td></tr>"



const PlayerList = document.getElementById("PlayerList");
const resetState = PlayerList.innerHTML

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomID = parseInt(urlParams.get("room"));





var PlayerMatchMap = new Object()
var PlayerMap = new Object()

function putInPlayerElo(data, key)
{
    if (data == null) {return;}
    PlayerMap[key] = data
    
    matchmaker()
}

function MatchSaver(P1, P2)
{
    console.log(P2)
    SaveMatch(P1, P2);
    SaveMatch(P2, P1);
    console.log(P1 + " <-> " + P2)
    matchmaker()
}

function SaveMatch(P1, P2)
{
    if (PlayerMatchMap[P1]==null)
    {
        PlayerMatchMap[P1] = [P2]
        return;
    }
    PlayerMatchMap[P1].push(P2)
}

function OrderElo()
{
    var List = Object.keys(PlayerMap).map(function(key) {
        return [key, PlayerMap[key]];
    });
    List.sort(function(first, second) {
        return second[1] - first[1];
    });
    return Object.keys(List).map(function(key) {
        return List[key];
    });
}




function resetDiv()
{
    PlayerList.innerHTML = resetState
}

function matchmaker()
{
    resetDiv()
    elo_ordered_keys = OrderElo()
    var i = 0
    while (elo_ordered_keys.length > 1)
    {
        i++;
        let next = elo_ordered_keys[0][0]
        elo_ordered_keys.shift()
        
        try {
            let n = findBestPartnerId(next, elo_ordered_keys)
            var next2 = elo_ordered_keys[n][0]
            elo_ordered_keys.splice(n, 1)
        }
        catch 
        {
            console.log("Error1")
            return;
        }
        putInPlayerData(next, next2)
        if (i==500)
        {
            return
        }
    }
}

function putInPlayerData(P1, P2)
{
    PlayerList.innerHTML += PlayerTablePrefab.replace(/\[P1\]/, P1).replace(/\[P2\]/, P2)
}




function findBestPartnerId(next, elo_ordered_keys)
{
    for (var i = 0; i < elo_ordered_keys; i++)
    {
        if (PlayerMatchMap[next].contains(elo_ordered_keys[i]))
        {
            return i
        }
    }
    return 0
}











loadAllPlayerElos(roomID, putInPlayerElo)
getAllMatches(roomID, MatchSaver)
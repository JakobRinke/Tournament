
const PlayerName = document.getElementById("PlayerName");
const PlayerElo = document.getElementById("PlayerElo");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const roomID = parseInt(urlParams.get("room"));


function addPlayer()
{
    const Player = PlayerName.value
    const Elo = parseInt(PlayerElo.value) || 1000
    setPlayer(roomID, Player, Elo)
    PlayerName.value = ""
    PlayerElo.value = "1000";
}
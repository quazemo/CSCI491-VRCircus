#pragma strict

private var doHide : boolean = false;

function hide() {
	doHide = true;
}

function reveal() {
	doHide = false;
}

//Update is called once per frame
function Update () {
}
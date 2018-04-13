#pragma strict

public var sdir : SpawnDirector;
public var menuH : MenuHandler;
private var diff : int = 1;

function OnMouseDown()
{
	if (!sdir.enabled)
	{
		sdir.onStart(diff);
	}
}

function OnCollisionEnter(col : Collision)
{
    if (!sdir.enabled)
	{
		Debug.Log("Starting up game!");
		menuH.hide();
		sdir.onStart(diff);
	}
}

function setDifficulty(nDiff : int)
{
	diff = nDiff;
}
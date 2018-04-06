#pragma strict

public var sd : SpawnDirector;
private var diff : int = 1;

function OnMouseDown()
{
	if (!sd.enabled)
	{
		sd.onStart(diff);
	}
}

function OnCollisionEnter(col : Collision)
{
    if (!sd.enabled)
	{
		sd.onStart(diff);
	}
}

function setDifficulty(nDiff : int)
{
	diff = nDiff;
}
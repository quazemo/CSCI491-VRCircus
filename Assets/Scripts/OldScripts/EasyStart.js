#pragma strict

public var sd : SpawnDirector;
private var diff : int = 0;

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
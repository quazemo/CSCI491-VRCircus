#pragma strict

public var sd : SpawnDirector;
public var diff : int;

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

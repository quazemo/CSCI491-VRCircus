#pragma strict

public var sd : SpawnDirector;

function OnMouseDown()
{
	if (!sd.enabled)
	{
		Debug.Log("clicked start");
		sd.onStart();
	}
	else
	{
		Debug.Log("clicked Stop");
		sd.onStop();
	}

}


#pragma strict

public var start : StartScript;
public var diff : int = 1;

function OnCollisionEnter(col : Collision)
{
	if (col.gameObject.tag == "Projectile")
	{
		start.setDifficulty(diff);
	}
}

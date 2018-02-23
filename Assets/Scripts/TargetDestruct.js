#pragma strict

public var distance : int = 0;
public var pointValue : int;
public var scoreUpdater : Score;

function Awake()
{
	pointValue = 5;
}

function OnCollisionEnter(col : Collision)
{
	Debug.Log("Target: Hit by " + col.gameObject.tag);
	if (col.gameObject.tag == "Projectile")
	{
		scoreUpdater.addScore(pointValue, distance);
		Destroy(gameObject);
	}
}

function setDistance(newDist : int)
{
	if (newDist >= 0)
	{
		distance = newDist;
	}
}

function setScoreUpdater(newUpdater : Score)
{
	scoreUpdater = newUpdater;
}

function setPointValue(val : int)
{
	pointValue = val;
}

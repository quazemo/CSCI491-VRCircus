#pragma strict

public var spawnLoc : Transform;
public var pointValue : int;
public var moveBehav : TargetMovement;
public var spawner : Spawner;
public var scoreUpdater : Score;

function Awake () 
{
	spawnLoc = transform.parent.transform;	
	spawner = transform.parent.parent.GetComponent(Spawner);
	moveBehav = new TargetMovement(spawnLoc);
}

function initialize(tInfo : TargetInfo)
{
	pointValue = tInfo.getPoints();
	moveBehav.update(tInfo.getMovement(), spawnLoc);
}

function Update () 
{
	moveBehav.move(transform, spawner);
}

function pause()
{
	enabled = false;
}

function resume()
{
	enabled = true;
}

function OnCollisionEnter(col : Collision)
{
	Debug.Log("Target: Hit by " + col.gameObject.tag);
	if (col.gameObject.tag == "Projectile")
	{
		scoreUpdater.addScore(pointValue, 1);
		Destroy(gameObject);
	}
}

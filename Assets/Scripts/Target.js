#pragma strict

public var spawnLoc : Transform;
public var pointValue : int;
public var moveBehav : TargetMovement;
public var spawner : Spawner;
public var scoreUpdater : Score;


public class Target extends MonoBehaviour implements ChildCollider
{
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
		if (col.gameObject.tag == "ShootingGalleryWall")
		{
			moveBehav.isDone = true;
		}
	}

	//the target's face collision is handled by a script on a child object. this retrieves its collision info
	function contact(col : Collision, childObj : GameObject)
	{
		if (col.gameObject.tag == "Projectile")
		{
			Debug.Log("Hit by Projectile");
			scoreUpdater.addScore(pointValue, 1);
			Destroy(childObj);
		}
	}
}

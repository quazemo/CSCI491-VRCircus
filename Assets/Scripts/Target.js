#pragma strict

public var spawnLoc : Transform;
public var pointValue : int;
public var moveBehav : TargetMovement;
public var spawner : Spawner;
public var scoreUpdater : Score;
public var destruct : boolean = true;
public var pointDisplay : UI.Text;

public class Target extends MonoBehaviour implements ChildCollider
{
	function Awake () 
	{
		spawnLoc = transform.parent.transform;	
		spawner = transform.parent.parent.GetComponent(Spawner);
		pointDisplay = findPointDisplay();
		moveBehav = new TargetMovement(spawnLoc);

	}

	private function findPointDisplay()
	{
		var obj : Transform = gameObject.transform.Find("Target/Canvas/Points");
		if (obj == null)
		{
			Debug.Log("Cannot find the text UI object for a target");
			return null;
		}
		var disp : UI.Text = obj.gameObject.GetComponent("Text") as UI.Text;
		var testUp : Vector3 = obj.up;

		if (obj.up.y < 0)
		{
			obj.RotateAround(obj.transform.position , obj.forward, 180);
		}

		return disp;
	}

	function initialize(tInfo : TargetInfo)
	{
		pointValue = tInfo.getPoints();
		moveBehav.update(tInfo.getMovement(), spawnLoc);
		if (pointDisplay != null)
		{
			pointDisplay.text = pointValue.ToString();
		}
	}

	function Update () 
	{
		moveBehav.move(transform, spawner);
	}

	function pause()
	{
		enabled = false;
		destruct = false;
	}

	function resume()
	{
		enabled = true;
		destruct = true;
	}

	function finish()
	{
		moveBehav.isDone = true;
		destruct = false;
		Destroy(gameObject);
	}

	function OnCollisionEnter(col : Collision)
	{
		//Debug.Log("Target: Hit by " + col.gameObject.tag);
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
			//Debug.Log("Hit by Projectile");
			if (destruct)
			{
				scoreUpdater.addScore(pointValue, 1);
				Destroy(childObj);
				moveBehav.isDone = true;
			}
		}
	}
}

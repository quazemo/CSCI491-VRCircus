#pragma strict

public class TargetMovement
{

	public var hSpeed : int;
	public var vSpeed : int;
	private var travelDir : Vector3;
	public var upDir : Vector3;
	public var isDone : boolean;
	public var isUp : boolean;

	public function TargetMovement(spawnLoc : Transform)
	{
		isDone = false;
		isUp = false;
		hSpeed = 0;
		vSpeed = 0;
		upDir = Vector3.up;
		parentDir(spawnLoc);
	}

	public function TargetMovement(spawnLoc : Transform, tMove : TargetMovement)
	{
		isDone = tMove.isDone;
		isUp = tMove.isDone;
		hSpeed = tMove.hSpeed;
		vSpeed = tMove.vSpeed;
		upDir = Vector3.up;
		parentDir(spawnLoc);
	}

	public function TargetMovement(hSpd : int, vSpd : int)
	{
		isDone = false;
		isUp = false;
		hSpeed = hSpd;
		vSpeed = vSpd;
		upDir = Vector3.up;
		travelDir = Vector3.left;
	}

	public function update(move : TargetMovement, spawnLoc : Transform)
	{
		isDone = move.isDone;
		isUp = move.isUp;
		hSpeed = move.hSpeed;
		vSpeed = move.vSpeed;
		upDir = Vector3.up;
		parentDir(spawnLoc);
	}

	//determines the default direction a target should go for a given spawn position
	private function parentDir(spawnLoc : Transform)
	{
		switch (spawnLoc.name)
		{
		case "SpawnLeft":
			travelDir = Vector3.right;
			break;
		case "SpawnMid":
			var dir : int = Random.Range(0, 2);
			switch (dir)
			{
				case 0:
					travelDir = Vector3.left;
					break;
				case 1:
					travelDir = Vector3.right;
					break;
			}
			break;
		case "SpawnRight":
			travelDir = Vector3.left;
			break;
		}
	}

	//moves a given game
	public function move(transform : Transform, spawner : Spawner)
	{

		if (transform.childCount == 0 && !isDone && isUp)
		{
			isDone = true;
		}
		else if (isUp && !isDone)
		{
			transform.Translate(travelDir * hSpeed * Time.deltaTime);
		}
		else if (!isUp && !isDone)
		{
			if (transform.localPosition.y < 0 )
			{
				transform.Translate(upDir * vSpeed * Time.deltaTime, Space.Self);
			}
			else
			{
				isUp = true;
			}
		}
		else if (isDone && isUp)
		{
			if (transform.position.y >= transform.parent.transform.position.y - SpawnLower.SPAWN_DEPTH)
			{
				transform.Translate(upDir * -vSpeed * Time.deltaTime);
			}
			else
			{
				isUp = false;
			}
		}
		//isDone && !isUp
		else
		{
			spawner.targetDestructed();
			GameObject.Destroy(transform.gameObject);
		}
	}

}
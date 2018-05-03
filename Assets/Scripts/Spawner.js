#pragma strict

public var id : char = "X"[0];
public var spawnLeft : Transform;
public var spawnMid : Transform;
public var spawnRight : Transform;
public var SPAWN_DEPTH = 1.3;
public var distance : int;
public var scoreUpdater : Score;
public var dir : Director;


public var targets : TargetInfo[];

public var count : int = 0;

//Sets the available targets
function setTargets(targs : TargetInfo[])
{
	Debug.Log("targets set in spawner");
	targets = targs;
}

//this function spawns a random target along one of the shooter walls
function randomSpawn () {

	if (targets == null)
	{
		Debug.Log("null target list");
		return;
	}

	var targId = Random.Range(0, targets.length);
	var spawnInfo = targets[targId];

	//check if can spawn, increment or delay
	var target : Transform = spawnInfo.getPrefab().transform;

	var spawnPosInd : int = Random.Range(0, 3);
	var spawnPos : Vector3;
	switch (spawnPosInd)
	{
		case 0:
			spawnPos = spawnLeft.transform.position;
	 		spawnPos.y -= SPAWN_DEPTH;
	 		target = Instantiate(target, spawnPos, Quaternion.identity, spawnLeft.transform);
	 		break;
	 	case 1:
	 		spawnPos = spawnMid.transform.position;
	 		spawnPos.y -= SPAWN_DEPTH;
	 		target = Instantiate(target, spawnPos, Quaternion.identity, spawnMid.transform);
	 		break;
	 	case 2:
	 		spawnPos = spawnRight.transform.position;
	 		spawnPos.y -= SPAWN_DEPTH;
	 		target = Instantiate(target, spawnPos, Quaternion.identity, spawnRight.transform);
	 		break;
	}
	var rot : Quaternion = new Quaternion();
	rot.SetLookRotation(target.parent.forward, target.parent.transform.up);
	target.rotation = rot;
	//target.transform.rotation.SetLookRotation(target.parent.forward, target.parent.transform.up);
	target.transform.Translate((Vector3.forward * (.3 * count)));

	/*
	var destructScript :TargetDestruct = target.gameObject.GetComponentInChildren(TargetDestruct);
	destructScript.setDistance(distance);
	destructScript.setScoreUpdater(scoreUpdater);
	*/
	var tScript : Target = target.gameObject.AddComponent(Target);
	tScript.initialize(spawnInfo);
	tScript.scoreUpdater = scoreUpdater;

	count++;
}

function spawnAt(pos : Transform)
{
}

function getCount() {
	return count;
}

function targetDestructed() {
	count--;
}

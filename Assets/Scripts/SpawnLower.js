#pragma strict

public var spawnLeft : GameObject;
public var spawnMid : GameObject;
public var spawnRight : GameObject;
public static var SPAWN_DEPTH = 1.3;
public var distance : int;
public var scoreUpdater : Score;

var targetBasic : Transform;

public var count : int = 0;

function Start () {

	//randomSpawn();
	//randomSpawn();
	//randomSpawn();

}

//this function spawns a random target along one of the shooter walls
function randomSpawn () {

	 var spawnPosInd : int = Random.Range(0, 3);
	 var target : Transform;
	 var spawnPos : Vector3;
	 switch (spawnPosInd)
	 {
	 	case 0:
	 		spawnPos = spawnLeft.transform.position;
	 		//spawnPos.z += .3 * count;
	 		spawnPos.y -= SPAWN_DEPTH;
	 		target = Instantiate(targetBasic, spawnPos, Quaternion.identity, spawnLeft.transform);
	 		break;
	 	case 1:
	 		spawnPos = spawnMid.transform.position;
	 		//spawnPos.z += .3 * count;
	 		spawnPos.y -= SPAWN_DEPTH;
	 		target = Instantiate(targetBasic, spawnPos, Quaternion.identity, spawnMid.transform);
	 		break;
	 	case 2:
	 		spawnPos = spawnRight.transform.position;
	 		//spawnPos.z += .3 * count;
	 		spawnPos.y -= SPAWN_DEPTH;
	 		target = Instantiate(targetBasic, spawnPos, Quaternion.identity, spawnRight.transform);
	 		break;
	 }
	 var rot : Quaternion = new Quaternion();
	 rot.SetLookRotation(target.parent.forward, target.parent.transform.up);
	 target.rotation = rot;
	 //target.transform.rotation.SetLookRotation(target.parent.forward, target.parent.transform.up);
	 target.transform.Translate((Vector3.forward * (.3 * count)));
	 /*
	 if (target.transform.right == target.parent.transform.right)
	 {
	 	Debug.Log("LParent match: " + target.transform.right);
	 }
	 else
	 {
	 	Debug.Log("LParent mismatch: T: " + target.transform.right + "\nP: " + target.parent.transform.right);
	 }*/
	 var destructScript :TargetDestruct = target.gameObject.GetComponentInChildren(TargetDestruct);
	 destructScript.setDistance(distance);
	 destructScript.setScoreUpdater(scoreUpdater);
	 target.gameObject.AddComponent(TargetScript);
	 count++;
}

function getCount() {
	return count;
}

function targetDestructed() {
	count--;
}



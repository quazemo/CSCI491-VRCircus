#pragma strict

public final var MAX_SPAWNS : int = 3;
public var id : char = "X"[0];
public var spawnLeft : Transform;
public var spawnMid : Transform;
public var spawnRight : Transform;
public var SPAWN_DEPTH = 1.3;
public var distance : int;
public var scoreUpdater : Score;
public var tCounter : TargetCounter;
public var dir : Director;

public var targets : TargetInfo[];
public var count : int = 0;

public var spawnSpeed : int = 0;
public var SPAWN_SPEED_INIT = 0;
public var SPAWN_LIMIT : int = 100;
private var spawnSum : int = 0;
public var deadCount : int = 0;
public var TICK : float = .1f;
private var tickTime : float = 0;

function Start()
{
	this.enabled = false;
	spawnSum = Random.Range(0, SPAWN_LIMIT);
}

//this function controls when a target spawns
function Update()
{
	
	if (targets == null || targets.length == 0)
	{
		Debug.Log("null or 0-length target list");
		this.enabled = false;
		return;
	}

	if (deadCount >= targets.length && count == 0)
	{
		this.enabled = false;
		dir.obituary(id);
		Debug.Log(id + " dead");
		return;
	}

	//this check covers for a specific case where death is normally delayed to until the next spawn. 
	if (count == 0 && noTargetsRemain())
	{
		this.enabled = false;
		deadCount = targets.length;
		dir.obituary(id);
		Debug.Log(id + " dead");
		return;
	}

	if (tickTime <= 0)
	{
		//Debug.Log(id + " spinning");
		for (var i : int = 0; i < spawnSpeed; i++)
		{
			spawnSum += Random.Range(0, 9);
		}
		if (spawnSum > SPAWN_LIMIT)
		{
			spawnSum = 0;
			randomSpawn();
		}
		tickTime = TICK;
	}
	tickTime -= Time.deltaTime;

}

private function noTargetsRemain()
{
	var name : String;
	for (var i : int = deadCount; i < targets.length; i++)
	{
		name = targets[i].getName();
		if (name != null && tCounter.getTargetCount(name) == 0)
		{
			deathSwap(i);
		}
	}
	return deadCount >= targets.length;
}

//this function passes a command to all child targets. Current commands:
//1. Clear -- This tells the targets to despawn.
//2. Pause -- This tells the targets to halt and prevent themselves from being destroyed
//3. Resume -- This tells the targets to start moving and allow themselves to be destroyed
public function commandTargets(command : String)
{
	switch (command)
	{
		case "Clear":
			count = 0;
			break;
		case "Resume":
			if (deadCount < targets.length)
			{
				this.enabled = true;
			}
			break;
		case "Pause":
			this.enabled = false;
			break;
	}
	
	var spawnPos : Transform;
	var target : Target;
	for (var i : int = 0; i < transform.childCount; i++)
	{
		spawnPos = transform.GetChild(i);
		for (var j : int = 0; spawnPos != null && j < spawnPos.childCount; j++)
		{
			target = spawnPos.GetChild(j).gameObject.GetComponent(Target);
			switch (command)
			{
				case "Clear":
					target.finish();
					break;
				case "Pause":
					target.pause();
					break;
				case "Resume":
					target.resume();
					break;
			}
		}
	}
} 

//Sets the available targets
function setTargets(targs : TargetInfo[])
{
	targets = targs;
}

//this function spawns a random target along one of the shooter walls
function randomSpawn () 
{

	if (targets == null)
	{
		Debug.Log("null target list");
		return;
	}
	if (count >= MAX_SPAWNS)
	{
		Debug.Log("Too many spawns");
		return;
	}
	if (deadCount >= targets.length)
	{
		Debug.Log("All target counts are empty.");
		return;
	}

	var targId = Random.Range(deadCount, targets.length);
	var spawnInfo = targets[targId];

	if (!requestTarget(spawnInfo.getName(), targId))
	{
		Debug.Log("requestDenied, trying another spawn");
		//try to spawn a new target
		randomSpawn();
		return;
	}

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
	//Caution: the following line only works sometimes. perform this action like above.
	//target.transform.rotation.SetLookRotation(target.parent.forward, target.parent.transform.up);
	target.transform.Translate((Vector3.forward * (.3 * count)));

	var tScript : Target = target.gameObject.AddComponent(Target);
	tScript.initialize(spawnInfo);
	tScript.scoreUpdater = scoreUpdater;

	count++;
}

//This function requests a particular target from the target Counter. It will return false when a target should not be spawned
//and true when one can be spawned. Should the target pool run out, this function will also arrange that this target is not requested
//again. 
private function requestTarget(name : String, tInd : int)
{
	if (tCounter.reqTarget(name))
	{
		//need to check if it is the end, otherwise will end up waiting one extra cycle.
		if (tCounter.getTargetCount(name) == 0)
		{
			//Debug.Log("request death in line " + id);
			deathSwap(tInd);
		}
		return true;
	}
	else
	{
		//Debug.Log("Backup request death " + id);
		deathSwap(tInd);
		return false;
	}
}

private function deathSwap(tInd : int)
{
	var swapTarget : TargetInfo = targets[tInd];
	targets[tInd] = targets[deadCount];
	targets[deadCount] = swapTarget;
	deadCount += 1;
}

function resetSpawnSpeed()
{
	spawnSpeed = SPAWN_SPEED_INIT;
}

function addSpawnSpeed(val : int)
{
	if (enabled)
	{	
		if (spawnSpeed + val < 0)
		{
			spawnSpeed = 0;
		}
		else
		{
			spawnSpeed += val;
		}
	}
}

public function raiseDead()
{
	deadCount = 0;
}

function getCount() {
	return count;
}

function targetDestructed() {
	count--;
	tCounter.decrementCount();
}

//this function returns the approximate spawn speed at which it is currently pumping out one type of sign
function getSpawnSpeed()
{
	if (targets.length <= deadCount)
	{
		return 0;
	}
	var ss : float = spawnSpeed;
	return ss / (targets.length - deadCount);
}

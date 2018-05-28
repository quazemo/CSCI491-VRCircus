#pragma strict

/*
Director controls activation of the various spawners. This includes starting, stopping, pausing, resuming, and difficulty setup. 
*/

public var difficulty : int;
public var spawners : Spawner[];
public var menuBoard: MenuGroup;
public var targCount: TargetCounter;
public var scoreBoard : Score;

private var tManage : TargetManager;
public var targXml : TextAsset;
private var deadSpawnerCount : int = 0;
private var isRunning = false;
private var isPaused = false;

public var DUT_MAX : float = 20f;
private var diffUpTimer : float = DUT_MAX;

function gameRunning()
{
	return isRunning;
}

function gamePaused()
{
	return isPaused;
}


function Awake () 
{	
	tManage = new TargetManager(spawners, targXml);
	//clearDeadSpawners();
	difficulty = 0;
	this.enabled = false;
}

function onStart(diff: int) 
{
	//Debug.Log("OnStart called with " + diff);

	isRunning = true;
	menuBoard.pauseEnabled(true);

	//reset the difficulty increase timer
	diffUpTimer = DUT_MAX;

	//reset scoreboard
	scoreBoard.resetScore();

	for (var i : int = 0; i < spawners.length; i++)
	{
		//clear out any targets still active
		spawners[i].commandTargets("Clear");
		spawners[i].resetSpawnSpeed();
	}

	//set up the number of signs based on the difficutly & difficulty increase timer
	difficulty = diff;
	updateDifficulty();

	//turn on the spawners
	toggleSpawners(true);

	//turn on the difficulty increasing script
	this.enabled = true;

}

function onStop() 
{
	isRunning = false;

	//turn spawners off
	toggleSpawners(false);

	//turn of difficulty increasing script
	this.enabled = false;

	for (var i : int = 0; i < spawners.length; i++)
	{
		//clear out any active signs
		spawners[i].commandTargets("Clear");
		//reset the RNG
		spawners[i].resetSpawnSpeed();
		//reset the type counter
		spawners[i].raiseDead();
	}

	//reset dead spawner count
	deadSpawnerCount = 0;

	//reveal the menu again
	menuBoard.reveal();
}

function onPause()
{
	isPaused = true;
	enabled = false;
	for (var i : int = 0; i < spawners.length; i++)
	{
		spawners[i].commandTargets("Pause");
	}
	//reveal menu
	menuBoard.reveal();
}

function onResume()
{
	isPaused = false;
	enabled = true;
	for (var i : int = 0; i < spawners.length; i++)
	{
		spawners[i].commandTargets("Resume");
	}
	menuBoard.hide();
}


function Update()
{
	diffUpTimer = diffUpTimer - Time.deltaTime;
	if (diffUpTimer <= 0)
	{
		diffUpTimer = DUT_MAX;
		difficultyUp();

		var tc : Dictionary.<String, int> = targCount.getTargetCounts();
		//for (var key : String in tc.Keys)
		//{
		//	Debug.Log("Remainting " + key + "s: " + tc[key]);
		//}
	}
}

function difficultyUp()
{
	Debug.Log("Upping difficulty");
	for (var i : int = 0; i < spawners.length; i++)
	{
		spawners[i].addSpawnSpeed(5);
	}
	diffUpTimer = DUT_MAX;
}

function updateDifficulty()
{
	Debug.Log("Updating difficulty... " + difficulty);
	switch (difficulty)
	{
		case 0:
			targCount.setCount(tManage.getSignCounts(), 0.1f);
			DUT_MAX = 1000;
			break;
		case 1:
			targCount.setCount(tManage.getSignCounts(), 1f);
			DUT_MAX = 25;
			break;
		case 2:
			targCount.setCount(tManage.getSignCounts(), 2f);
			DUT_MAX = 10;
			break;
		default:
			Debug.Log("Default difficulty");
			targCount.setCount(tManage.getSignCounts(), 1f);
			DUT_MAX = 20;
			break;
	}
}

private function toggleSpawners(doEnable : boolean)
{
	for (var i : int = 0; i < spawners.length; i++)
	{
		spawners[i].enabled = doEnable;
	}
}

//this function, when notified of a dead spawner, will notify the other spawners if they need to be speed up.
//it also increments the deadSpawnerCount, and ends the game when all are dead. 
public function obituary(sId : char)
{
	deadSpawnerCount += 1;
	Debug.Log("dead rows: " + deadSpawnerCount);
	if (deadSpawnerCount >= spawners.length)
	{
		Debug.Log("Stopping..." + Time.time);
		onStop();
	}
	else
	{
		//analyzeDeaths();
	}
}

//this function finds out which spawners need speeding up, and speeds them up if necessary.
private function analyzeDeaths()
{
	var workload : Dictionary.<char, float> = new Dictionary.<char, float>();
	var targDict : Dictionary.<String, TargetInfo> = tManage.getSpawnerTargetMap();
	var spawnDict : Dictionary.<char, Spawner> = new Dictionary.<char, Spawner>();
	for (var i : int = 0 ; i < spawners.length; i++)
	{
		workload[spawners[i].id] = spawners[i].getSpawnSpeed();
		spawnDict[spawners[i].id] = spawners[i];
	}
	var remTargDict : Dictionary.<String, int>;
	remTargDict = targCount.getTargetCounts();

	var typeWorkload : Dictionary.<String, float>;
	typeWorkload = calculateRngTypeSpeed(workload, targDict, remTargDict);

	var min : float = -1;
	for (var key : String in typeWorkload.Keys)
	{
		if (typeWorkload[key] < min || (min == -1 && typeWorkload[key] != 0))
		{
			min = typeWorkload[key];
		}
	}

	var sid : char;
	var idsLen : int;
	var factorLimit : int = 4;
	var boost : int;
	for (var key : String in targDict.Keys)
	{
		if (typeWorkload[key] > 0 && typeWorkload[key] >= factorLimit * min)
		{
			Debug.Log("Speeding up " + key);
			idsLen = targDict[key].getIds().length;
			boost = factorLimit / idsLen;
			if (boost < 1)
			{
				boost = 1;
			}
			for (var j : int = 0; j < idsLen; j++)
			{
				sid = targDict[key].getIds()[j];
				spawnDict[sid].addSpawnSpeed(boost);
			}
		}
	}

}

//this function calculates the typeWorkload of the system. Essentially, it is finding out how many signs are going to be spawned per RNG, organized by type
private function calculateRngTypeSpeed(workload : Dictionary.<char, float>, targDict : Dictionary.<String, TargetInfo>, remTargDict : Dictionary.<String, int>)
{
	var typeWorkload : Dictionary.<String, float> = new Dictionary.<String, float>();
	for (var key : String in targDict.Keys)
	{
		typeWorkload[key] = 0;
		for (var i : int = 0; i < targDict[key].getIds().length; i++)
		{
			typeWorkload[key] += workload[targDict[key].getIds()[i]];
		}
		typeWorkload[key] = remTargDict[key] / typeWorkload[key];
	}
	return typeWorkload;
}

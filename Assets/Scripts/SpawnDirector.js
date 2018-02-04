﻿#pragma strict

public var difficulty : int;
public var lowerWalls : SpawnLower[] = new SpawnLower[4];
public var highWalls : SpawnUpper[] = new SpawnUpper[2];
public var spawnTimerL: float;
public var spawnTimerU: float;
public var spawnVariance: float;
private var targetTimer : float;
private var abductTimer : float;
public final var MAX_SPAWNS : int = 3;

function Awake () 
{
	difficulty = 0;
	this.enabled = false;
}

function onStart() 
{
	Debug.Log("OnStart called");
	updateDifficulty();
	this.enabled = true;
}

function updateDifficulty()
{
	Debug.Log("Updating difficulty... " + difficulty);
	switch(difficulty)
	{
		case 0:
			spawnTimerL = 7f;
			spawnTimerU = 5000f;
			spawnVariance = 2f;
			Debug.Log("Easy mode, " + difficulty);
			break;
		case 1:
			spawnTimerL = 6f;
			spawnTimerU = 1000f;
			spawnVariance = 5f;
			Debug.Log("Medium mode, " + difficulty);
			break;
		case 2:
			spawnTimerL = 7f;
			spawnTimerU = 100f;
			spawnVariance = 7f;
			Debug.Log("Hard mode, " + difficulty);
			break;
		default:
			spawnTimerL = 7f;
			spawnTimerU = 1000f;
			spawnVariance = 5f;
			Debug.Log("Default mode, " + difficulty);
	}
	targetTimer = spawnTimerL;
	abductTimer = spawnTimerU;
}

function onStop() 
{
	this.enabled = false;
}

function Update () 
{
	var spawnTarget: boolean = false;
	var spawnAbductor: boolean = false;

	targetTimer -= Time.deltaTime;
	abductTimer -= Time.deltaTime;

	if (targetTimer <= 0) 
	{
		spawnTarget = true;
	}
	if (targetTimer <= 0)
	{
		spawnAbductor = true;
	}

	if (spawnTarget)
	{
		spawnRandTarget();
		spawnTarget = false;
		targetTimer =  spawnTimerL + variance();
	}
	if (spawnAbductor)
	{
		spawnRandAbductor();
		spawnAbductor = false;
		abductTimer =  spawnTimerU + variance();
	}

}

function variance() : float
{
	var neg : int = Random.Range(0, 2);
	if (neg == 0)
	{
		return Random.Range(0f, spawnVariance);
	}
	else
	{
		return -Random.Range(0f, spawnVariance);
	}
}

function spawnRandAbductor()  
{
	
}

function spawnRandTarget()
{
	var notSpawned : boolean = true;
	var spawnIndex : int;
	var trySpawn : int = 4;

	while (notSpawned && trySpawn > 0)
	{
		spawnIndex = Random.Range(0, 4); 
		if (lowerWalls[spawnIndex].getCount() < MAX_SPAWNS)
		{
			lowerWalls[spawnIndex].randomSpawn();
			notSpawned = false;
		}
		trySpawn--;
	}

}

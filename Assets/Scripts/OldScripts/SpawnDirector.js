﻿#pragma strict

public final var MAX_SPAWNS : int = 3;
public final var GAME_TIME : float = 10f;
public final var LOW_ROWS : int = 4;

public var difficulty : int;
public var lowerWalls : SpawnLower[] = new SpawnLower[LOW_ROWS];
public var highWalls : SpawnUpper[] = new SpawnUpper[2];
public var spawnTimerL: float;
public var spawnTimerU: float;
public var spawnVariance: float;
public var menuBoard: MenuHandler;
public var gameTime: GameTimer;

public var numTargets : int[];


private var targetTimer : float;
private var abductTimer : float;


function Awake () 
{
	difficulty = 0;
	this.enabled = false;
}

function onStart(diff: int) 
{
	Debug.Log("OnStart called");
	difficulty = diff;
	updateDifficulty();
	this.enabled = true;
	gameTime.setTimer(GAME_TIME);
	gameTime.gameObject.SetActive(true);
}

function updateDifficulty()
{
	Debug.Log("Updating difficulty... " + difficulty);
	switch(difficulty)
	{
		case 0:
			spawnTimerL = 2f;
			spawnTimerU = 10000f;
			spawnVariance = 1f;
			Debug.Log("Easy mode, " + difficulty);
			break;
		case 1:
			spawnTimerL = 1f;
			spawnTimerU = 1000f;
			spawnVariance = 1f;
			Debug.Log("Medium mode, " + difficulty);
			break;
		case 2:
			spawnTimerL = 0f;
			spawnTimerU = 40f;
			spawnVariance = 2f;
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
	menuBoard.reveal();
	gameTime.gameObject.SetActive(false);
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
	if (abductTimer <= 0)
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
	var notSpawned : boolean = true;
	var spawnIndex : int;
	var trySpawn : int = 2;

	while (notSpawned && trySpawn > 0)
	{
		spawnIndex = Random.Range(0, 2); 
		if (highWalls[spawnIndex].getCount() < MAX_SPAWNS)
		{
			highWalls[spawnIndex].randomSpawn();
			notSpawned = false;
		}
		trySpawn--;
	}
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
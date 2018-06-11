﻿#pragma strict

public var sdir : SpawnDirector;
public var menuH : MenuHandler;
private var diff : int = 1;
public var score : Score;

function OnMouseDown()
{
	if (!sdir.enabled)
	{
		sdir.onStart(diff);
	}
}

function OnCollisionEnter(col : Collision)
{
    if (!sdir.enabled)
	{
		Debug.Log("Starting up game!");
		score.resetScore();
		menuH.hide();
		sdir.onStart(diff);
	}
}

function setDifficulty(nDiff : int)
{
	diff = nDiff;
}
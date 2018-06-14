﻿#pragma strict

public var difficultyButtons : GameObject[];
public var weaponSelectButtons : GameObject[];
public var instructionButton : GameObject;
public var returnButton : GameObject;
public var startButton : GameObject;
public var pauseButton : GameObject;
private var doHide : boolean = false;
private var anim : Animator;

function Start()
{
	anim = gameObject.GetComponent(Animator);
}

function hide() 
{
	//Debug.Log("Hide");
	anim.SetBool("Hidden", true);
	//yield WaitForSeconds(anim["SignAway"].length);
}

function vanish(doVanish : int)
{
	gameObject.SetActive(doVanish == 0);
}

function reveal() 
{
	//Debug.Log("Reveal");
	gameObject.SetActive(true);
	anim.SetBool("Hidden", false);
}

function toggleSelect(difficulty : DiffSelect)
{
	var i : int;
	var button : DiffSelect;
	for (i = 0; i < difficultyButtons.length; i++)
	{
		button = difficultyButtons[i].GetComponent(DiffSelect);
		if (button == difficulty)
		{
			difficulty.select(true);
		}
		else
		{
			button.select(false);
		}
	}
}

function pauseEnabled(isEnabled : boolean)
{
	var pause : Pause = pauseButton.GetComponent(Pause);
	pause.pauseEnable(isEnabled);
}
#pragma strict

public var transRate : float = .05f;
public var difficultyButtons : GameObject[];
public var weaponSelectButtons : GameObject[];
public var instructionButton : GameObject;
public var returnButton : GameObject;
public var startButton : GameObject;
private var doHide : boolean = false;
private var anim : Animator;

function Start()
{
	anim = gameObject.GetComponent(Animator);
}

function hide() 
{
	Debug.Log("Hide");
	anim.SetBool("Hidden", true);
	//yield WaitForSeconds(anim["SignAway"].length);
}

function vanish(doVanish : int)
{
	gameObject.SetActive(doVanish == 0);
}

function reveal() {
	Debug.Log("Reveal");
	gameObject.SetActive(true);
	anim.SetBool("Hidden", false);
}

function toggleSelect(difficulty : DifficultySelect)
{
	var i : int;
	var button : DifficultySelect;
	for (i = 0; i < difficultyButtons.length; i++)
	{
		button = difficultyButtons[i].GetComponent(DifficultySelect);
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

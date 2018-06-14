#pragma strict

public var timer : float = 0;
public var director : SpawnDirector;
public var timeText : UI.Text;

function Awake()
{
	gameObject.SetActive(false);
}

// Update is called once per frame
function Update () {

	if (timer > 0)
	{
		timer -= Time.deltaTime;
		timeText.text = "" + Mathf.Round(timer * 100)/100;
	}
	else
	{
		timer = 0;
		director.onStop();
		timeText.text = "" + Mathf.Round(timer * 100)/100;
		gameObject.SetActive(false);
	}
}

function setTimer(seconds : float)
{
	timer = seconds;
}

